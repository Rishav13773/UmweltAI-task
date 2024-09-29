import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  Project,
  ProjectService,
  Task,
} from '../../../globalContext/project.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgFor,
    DatePipe,
    NavbarComponent,
    FormsModule,
  ],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  taskForm: FormGroup;
  isEditMode: boolean = false;
  editedTask: Task | null = null;
  filteredTasks: Task[] = [];
  sortOption: string = 'priority';
  filterOption: string = 'all';

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      priority: ['Medium', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.projectService.getProjectById(projectId);
    if (this.project?.tasks) {
      this.filteredTasks = [...this.project.tasks]; // Initialize with all tasks
      this.sortTasks(); // Initial sorting
    }
  }

  // Sort tasks based on the selected option
  sortTasks() {
    if (this.sortOption === 'priority') {
      this.filteredTasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (this.sortOption === 'deadline') {
      this.filteredTasks.sort(
        (a, b) =>
          new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      );
    }
  }

  // Filter tasks based on the selected priority
  filterTasks() {
    if (this.filterOption === 'all') {
      this.filteredTasks = [...(this.project?.tasks || [])];
    } else {
      this.filteredTasks = (this.project?.tasks || []).filter(
        (task) => task.priority === this.filterOption
      );
    }
    this.sortTasks(); // Apply sorting after filtering
  }

  // Add or update task
  submitTask() {
    if (this.isEditMode && this.editedTask) {
      const updatedTask: Task = {
        ...this.editedTask,
        ...this.taskForm.value,
      };
      this.projectService.updateTaskInProject(this.project!.id, updatedTask);
    } else {
      const newTask: Task = {
        ...this.taskForm.value,
        id: Date.now(),
      };
      this.projectService.addTaskToProject(this.project!.id, newTask);
    }

    this.resetForm();
    this.filterTasks(); // Re-filter and sort after task change
  }

  // Edit task
  editTask(task: Task) {
    this.isEditMode = true;
    this.editedTask = task;
    this.taskForm.patchValue(task);
  }

  // Delete task
  deleteTask(taskId: number) {
    this.projectService.deleteTaskFromProject(this.project!.id, taskId);
    this.filterTasks(); // Re-filter and sort after task deletion
  }

  // Reset form
  resetForm() {
    this.isEditMode = false;
    this.editedTask = null;
    this.taskForm.reset({
      priority: 'Medium',
    });
  }
}

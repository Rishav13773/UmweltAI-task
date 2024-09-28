import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
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
  imports: [ReactiveFormsModule, NgIf, NgFor, DatePipe, NavbarComponent],
})
export class ProjectDetailsComponent implements OnInit {
  project: Project | undefined;
  taskForm: FormGroup;
  isEditMode: boolean = false;
  editedTask: Task | null = null;

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
    console.log('projectId', projectId);
    this.project = this.projectService.getProjectById(projectId);
    console.log('project', this.project);
  }

  // Add a new task or update an existing one
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
      console.log('ID', this.project?.id);
      this.projectService.addTaskToProject(this.project!.id, newTask);
    }

    this.resetForm();
  }

  // Edit task mode
  editTask(task: Task) {
    this.isEditMode = true;
    this.editedTask = task;
    this.taskForm.patchValue(task);
  }

  // Delete task
  deleteTask(taskId: number) {
    this.projectService.deleteTaskFromProject(this.project!.id, taskId);
  }

  // Reset form and exit edit mode
  resetForm() {
    this.isEditMode = false;
    this.editedTask = null;
    this.taskForm.reset({
      priority: 'Medium',
    });
  }
}

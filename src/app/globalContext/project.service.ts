import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: number;
  name: string;
  priority: string;
  deadline: Date;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tasks: Task[];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  // BehaviorSubject for storing and managing the state of projects
  private projects = new BehaviorSubject<Project[]>([]);
  projects$ = this.projects.asObservable();

  constructor() {
    // Initialize with some demo projects (optional)
    this.projects.next([
      { id: 1, name: 'Project 1', description: 'This is project 1', tasks: [] },
      { id: 2, name: 'Project 2', description: 'This is project 2', tasks: [] },
      { id: 3, name: 'Project 3', description: 'This is project 3', tasks: [] },
    ]);
  }

  // Get all projects
  getProjects(): Project[] {
    return this.projects.getValue();
  }

  // Add a new project
  addProject(project: Project) {
    const currentProjects = this.projects.getValue();
    this.projects.next([...currentProjects, project]);
  }

  // Get a project by ID
  getProjectById(projectId: number): Project | undefined {
    return this.projects.getValue().find((project) => project.id === projectId);
  }

  // Update a project
  updateProject(updatedProject: Project) {
    const currentProjects = this.projects.getValue();
    const updatedProjects = currentProjects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    this.projects.next(updatedProjects);
  }

  // Delete a project
  deleteProject(projectId: number) {
    const currentProjects = this.projects.getValue();
    const filteredProjects = currentProjects.filter(
      (project) => project.id !== projectId
    );
    this.projects.next(filteredProjects);
  }

  // TASKS MANAGEMENT

  // Add a new task to a specific project
  addTaskToProject(projectId: number, task: Task) {
    const currentProjects = this.projects.getValue();
    const updatedProjects = currentProjects.map((project) => {
      if (project.id === projectId) {
        project.tasks = [...project.tasks, task];
      }
      return project;
    });
    this.projects.next(updatedProjects);
  }

  // Get tasks of a specific project
  getTasksByProjectId(projectId: number): Task[] {
    const project = this.getProjectById(projectId);
    return project ? project.tasks : [];
  }

  // Update a task within a specific project
  updateTaskInProject(projectId: number, updatedTask: Task) {
    const currentProjects = this.projects.getValue();
    const updatedProjects = currentProjects.map((project) => {
      if (project.id === projectId) {
        project.tasks = project.tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
      }
      return project;
    });
    this.projects.next(updatedProjects);
  }

  // Delete a task from a specific project
  deleteTaskFromProject(projectId: number, taskId: number) {
    const currentProjects = this.projects.getValue();
    const updatedProjects = currentProjects.map((project) => {
      if (project.id === projectId) {
        project.tasks = project.tasks.filter((task) => task.id !== taskId);
      }
      return project;
    });
    this.projects.next(updatedProjects);
  }
}

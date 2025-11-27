import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Item } from '../../shared/models/item';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.html',
  styleUrls: ['./item-form.css']
})
export class ItemFormComponent implements OnInit {
  itemForm!: FormGroup;
  isEditMode = false;
  itemId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['', [Validators.required]],
      featured: [false]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.itemId = parseInt(id, 10);
      this.loadItem(this.itemId);
    }
  }

  loadItem(id: number): void {
    const item = this.dataService.getItemById(id);
    if (item) {
      this.itemForm.patchValue({
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl,
        featured: item.featured
      });
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;
      if (this.isEditMode && this.itemId !== null) {
        this.dataService.updateItem(this.itemId, formValue);
      } else {
        this.dataService.addItem(formValue);
      }
      this.router.navigate(['/']);
    } else {
      this.markFormGroupTouched(this.itemForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  get title() {
    return this.itemForm.get('title');
  }

  get description() {
    return this.itemForm.get('description');
  }

  get imageUrl() {
    return this.itemForm.get('imageUrl');
  }

  get featured() {
    return this.itemForm.get('featured');
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}

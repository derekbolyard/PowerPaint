import { Component, HostListener } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-paint-presentation',
  templateUrl: './paint-presentation.component.html',
  styleUrls: ['./paint-presentation.component.scss']
})
export class PaintPresentationComponent {
  pages: string[] = [];
  selectedPage: string | null = null;
  inPresentationMode: boolean = false;
  currentPageIndex = 0;

  selectPage(index: number) {
    this.selectedPage = this.pages[index];
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) {
      Array.from(inputElement.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.pages.push(e.target?.result as string); // Add each file's data URL to the images array
          if (!this.selectedPage) {
            this.selectPage(0);
          }
        };
        reader.readAsDataURL(file);
      });
    }

    if (this.selectedPage == null || this.selectedPage == undefined || this.selectedPage == '') {
      this.selectedPage = this.pages[0];
    }
  }


  addSlide() {
    alert('Please open MS Paint, create your slide, save it, and then upload it here.');
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pages, event.previousIndex, event.currentIndex);
  }

  // presentation stuff
  startPresentation() {
    this.inPresentationMode = true;
    this.currentPageIndex = 0; // Start from the first page
  }

  endPresentation() {
    this.inPresentationMode = false;
  }

  goToNextPage() {
    if (this.currentPageIndex < this.pages.length - 1) {
      this.currentPageIndex++;
    }
  }

  goToPreviousPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.inPresentationMode) {
      if (event.key === 'ArrowRight') {
        this.goToNextPage();
      } else if (event.key === 'ArrowLeft') {
        this.goToPreviousPage();
      }
    }
  }
}

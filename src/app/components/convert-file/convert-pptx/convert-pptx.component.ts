import { Component } from '@angular/core';
import { ConvertService } from '../../../services/convert.service';

@Component({
  selector: 'app-convert-pptx',
  templateUrl: './convert-pptx.component.html',
  styleUrls: ['./convert-pptx.component.css']
})
export class ConvertPptxComponent {
  fileName: string = '';
  fileContent: File | null = null;

  constructor(private convertService: ConvertService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.name.endsWith('.pptx')) {
      this.fileName = file.name;
      this.fileContent = file;
    } else {
      alert('Veuillez sélectionner un fichier PPTX.');
      this.fileName = '';
      this.fileContent = null;
    }
  }

  onUpload(): void {
    if (this.fileContent) {
      const formData = new FormData();
      formData.append('file', this.fileContent); // Correction ici

      this.convertService.postData(formData).subscribe(
        (response) => {
          console.log('Réponse de l\'API:', response);
          alert('Fichier ajouté avec succès !');
          this.onReset(); // Réinitialisation après succès
        },
        (error) => {
          console.error('Erreur lors de l\'upload:', error);
          alert('Échec de l\'ajout du fichier.');
        }
      );
    } else {
      alert('Veuillez sélectionner un fichier avant de l\'ajouter.');
    }
  }

  onReset(): void {
    this.fileName = '';
    this.fileContent = null;
  }
}

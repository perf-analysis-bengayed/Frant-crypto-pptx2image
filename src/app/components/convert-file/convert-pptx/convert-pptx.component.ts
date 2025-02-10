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
  public uploading = false;
  public error = '';
  public imageList: string[] = [];
  isDraggingOver = false;
  constructor(private convertService: ConvertService) {}

 onDragOver(event:any): void {
   event.preventDefault(); // Empêche le comportement par défaut du navigateur.
   this.isDraggingOver = true; // Active la classe active sur la zone de dépôt.
 }

 onDrop(event:any): void {
   event.preventDefault();
   const file = event.dataTransfer.files[0];
   
   if(file && file.name.endsWith('.pptx')) {
     this.fileName = file.name;
     this.fileContent = file; // Met à jour le contenu du fichier.
     this.isDraggingOver = false; // Désactive l'état "survol".
   } else {
     alert('Veuillez sélectionner un fichier PPTX.');
     this.fileName = '';
     this.fileContent = null; 
     this.isDraggingOver = false; // Désactive l'état "survol".
   }
 }

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

  onUpload(apiUrl: string): void {
    if (this.fileContent) {
      this.uploading = true;  
      const formData = new FormData();
      formData.append('file', this.fileContent);
  
      this.convertService.postData(apiUrl, formData).subscribe(
        (response: { url?: string }) => { 
          console.log('Réponse de l\'API:', response);
          if (response && response.url) {
            alert(`Fichier ajouté avec succès ! Voici le lien : ${response.url}`);
            // Vous pouvez stocker ou afficher cette URL comme nécessaire
            this.imageList.push(response.url);  
          } else {
            alert('Aucune URL générée.');
          }
        },
        (error: unknown) => {
          console.error('Erreur lors de l\'upload:', error);
          alert('Échec de l\'ajout du fichier.');
        }
      );
    } else {
      alert('Veuillez sélectionner un fichier avant de l\'ajouter.');
    }
  }
  convertAndDisplayUrl(): void {
    const apiUrl = 'http://localhost/api/convert-pptx'; 
    this.onUpload(apiUrl);
  }
  

  onReset(): void {
    this.fileName = '';
    this.fileContent = null;
    this.imageList = [];  // Réinitialisation de la liste des images
  }




}

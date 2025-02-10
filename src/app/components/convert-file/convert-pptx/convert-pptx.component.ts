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

   imageList1 = [
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",
    "../assets/images/MainBefore.jpg",

  ];
  imagesToShow: number = this.imageList1.length; 

    getRange(n: number): number[] {
      return Array(n).fill(0).map((_, i) => i);
    }
    imagesPerRow: number = 3; // Valeur initiale
  imageWidth: number = 150; // Largeur initiale des images
  imageHeight: number = 150; // Hauteur initiale des images
  constructor(private convertService: ConvertService) {}
  onRangeChange(event: Event) {
    // Vérifie si l'élément déclencheur est une entrée HTML de type range
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
  
    // Calcul du nombre d'images par ligne (inverse du range)
    this.imagesPerRow = this.imageList1.length - value + 1;
  
    // Calcul de la taille des images (plus grand si moins d'images par ligne, plus petit sinon)
    this.imageWidth = 300 - (this.imagesPerRow * 20);
    this.imageHeight = 300 - (this.imagesPerRow * 20);
  
    // Assurer une taille minimale des images
    if (this.imageWidth < 50) {
      this.imageWidth = 90;
      this.imageHeight = 90;
    }
  
    // Assurer un nombre minimum et maximum d'images par ligne
    if (this.imagesPerRow < 1) {
      this.imagesPerRow = 1;
    } else if (this.imagesPerRow > this.imageList1.length) {
      this.imagesPerRow = this.imageList1.length;
    }
  }
  
  
 onDragOver(event:any): void {
   event.preventDefault(); // Empêche le comportement par défaut du navigateur.
   this.isDraggingOver = true; // Active la classe active sur la zone de dépôt.
 }

 onDrop(event:any): void {
   event.preventDefault();
   const file = event.dataTransfer.files[0];
   
   if(file && file.name.endsWith('.pptx')) {
     this.fileName = file.name;
     this.fileContent = file;
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

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

interface PhoneNumber {
  number: string;
  format: string;
}

@Component({
  selector: 'app-phone-number-detector',
  templateUrl: './phone-number-detector.component.html',
  styleUrls: ['./phone-number-detector.component.css']
})
export class PhoneNumberDetectorComponent implements OnInit {
  inputText: string = '';
  phoneNumbers: PhoneNumber[] = [];
  errorMessage: string | null = null;
  selectedFile: File | null = null;

  ngOnInit(): void {
    console.log("PhoneNumberDetectorComponent initialized");
  }

  constructor(private https: HttpClient) { }

  detectPhoneNumbers() {
    debugger
    const payload = { text: this.inputText };
    this.https.post<PhoneNumber[]>('https://localhost:7056/api/PhoneNumber/detect-from-text', payload)
      .subscribe(
        data => {
          this.phoneNumbers = data;
          this.errorMessage = null;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error ? error.error.title : error.message;
        if(this.inputText=""){
          confirm("Error! plaese enter text to detect the phone numvbers!");
        }
        else{
          confirm("Error! plaese enter text in correct format!");
        }
          this.phoneNumbers = [];
        }
      );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  detectPhoneNumbersFromFile() {
    if (!this.selectedFile) {
      this.errorMessage = 'Please select a file.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.https.post<PhoneNumber[]>('https://localhost:7056/api/PhoneNumber/detect-from-file', formData)
      .subscribe(
        data => {
          this.phoneNumbers = data;
          this.errorMessage = null;
        },
        (error: HttpErrorResponse) => {
          this.errorMessage = error.error ? error.error.title : error.message;
          this.phoneNumbers = [];
          if(!this.selectedFile){
            confirm("Error! please select a file to detect the phone numvbers!");
          }
          else{
            confirm("Error! please enter text in correct format!");
          }
        }
      );
  }
}

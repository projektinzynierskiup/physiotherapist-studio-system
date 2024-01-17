import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { setLastPageVisited } from '../../main/store/main.actions';
import { Subscription } from 'rxjs';
import { selectMassage, selectOffer, selectStatuate } from '../../main/home/store/home.selectors';
import { OfferItem, OfferPhoto } from '../../shared/models/offeritem.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { AdministrationService } from '../services/administration.service';
import { getMassage, getOffer, getStatuate } from '../../main/home/store/home.actions';
import { Massage } from '../../shared/models/massage.model';
import { Statuate } from '../../shared/models/statuate.model';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-administration-entry',
  templateUrl: './administration-entry.component.html',
  styleUrls: ['./administration-entry.component.scss']
})
export class AdministrationEntryComponent implements OnInit, OnDestroy {
  offerSubscription?: Subscription
  massageSubscription?: Subscription
  statuateSubscription?: Subscription
  offer?: OfferItem[]
  massageList?: Massage[]
  availableMassageList?: Massage[]
  showItems = false;
  showPriceList = false
  showSidebar = true;

  addMode: boolean = false;
  offerAdded: boolean = false;

  addOfferForm: FormGroup;
  addMassageForm: FormGroup;

  editOffer:boolean = false
  editMassage:boolean = false
  editMassageId?:number
  editOfferId?: number
  selectedImage: number[] | undefined = undefined;
  editStatuate: boolean = false
  editStatuateContent: string = 'Regulamin nie istnieje'
  submitButtonClick:boolean = false;
  switchCase? : 'offer' | 'regulations' = 'offer'

  statuate!: Statuate;

  offerPhotoList!: OfferPhoto[]
  selectedOfferId?: number;
  
  menuItems : any[] = [
    {
      title: "Zarządzanie ofertą",
      icon: "dns",
      key: "offer"
    }, {
      title: "Zarządzanie regulaminem",
      icon: "attach_money",
      key: "regulations"
    },
  ]
  

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialogService: NbDialogService,
    private administrationService: AdministrationService
    ) { 
    this.addOfferForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      massageId: ['', Validators.required],
    });

    this.addMassageForm = this.fb.group({
      massageName: ['', Validators.required],
      description: ['', Validators.required],
      appointmentType: ['', Validators.required]
    });


  }

  ngOnInit(): void {

    this.store.dispatch(setLastPageVisited({url: '/administration'}))
    this.store.dispatch(getMassage())
    this.store.dispatch(getOffer())
    this.store.dispatch(getStatuate())
    this.getAllOfferPhoto()
    this.massageSubscription = this.store.select(selectMassage).subscribe(res => {
      console.log(res)
      if(res.length) {
        this.massageList = res
      } 
    })

    this.offerSubscription = this.store.select(selectOffer).subscribe(res => {
      console.log(res)
      if(res.length) {
        this.offer = res
        this.getAvailableMassageList()
      } 
    })



    this.statuateSubscription = this.store.select(selectStatuate).subscribe(res => {
      console.log(res)
      if(res) {
        this.statuate = res
        this.editStatuateContent = this.statuate.content
      } else if (!res && this.switchCase == 'regulations') {
        this.addStatuate("Regulamin nie istnieje")
      }
    })
  }

  openAddDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog)

    this.submitButtonClick = false
    this.editMassage = false
    this.editOffer = false

    this.addOfferForm = this.fb.group({
      name: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      massageId: ['', Validators.required],
    });


    this.addMassageForm = this.fb.group({
      massageName: ['', Validators.required],
      description: ['', Validators.required],
      appointmentType: ['', Validators.required]
    });

    this.getAvailableMassageList()
  }


  openEditOfferDialog(dialog: TemplateRef<any>, offerItem: OfferItem) {

    this.addOfferForm = this.fb.group({
      name: [offerItem.name, Validators.required],
      duration: [offerItem.duration, Validators.required],
      price: [offerItem.price, Validators.required],
      massageId: [offerItem.massageId, Validators.required],
    });

    this.editOffer = true
    this.editOfferId = offerItem.id
    this.dialogService.open(dialog)
  }

  openConfirmEditDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: this.addMassageForm?.get('massageName')?.value })
  }

  openConfirmOfferEditDialog(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: this.addOfferForm?.get('name')?.value })
  }

  openEditMassageDialog(dialog: TemplateRef<any>, massage: Massage) {
    this.addMassageForm = this.fb.group({
      massageName: [massage.massageName, Validators.required],
      description: [massage.description, Validators.required],
      appointmentType: [massage.appointmentType, Validators.required],
    });
    this.editMassage = true
    this.editMassageId = massage.id
    this.dialogService.open(dialog)
  }

  triggerEditStatuateMode() {
    this.editStatuate = !this.editStatuate
    this.editStatuateContent = this.statuate.content

  }

  saveMassage() {
    this.submitButtonClick = true
    if(!this.addMassageForm.valid) return 
    console.log(this.addMassageForm.value)



    if(this.editMassage) {
      const editMassageItem : Massage = {
        id: this.editMassageId,
        massageName: this.addMassageForm?.get('massageName')?.value,
        description: this.addMassageForm?.get('description')?.value,
        appointmentType: this.addMassageForm?.get('appointmentType')?.value,
      }

      this.administrationService.editMassage(editMassageItem).subscribe(res => {
        console.log(res)
        this.store.dispatch(getMassage())
        this.submitButtonClick = false
      })
    } else { 
      this.administrationService.addMassage(this.addMassageForm.value).subscribe(res => {
        console.log(res)
        this.store.dispatch(getMassage())
        this.submitButtonClick = false
      })
    }
  }

  saveOffer() {
    this.submitButtonClick = true

    if(!this.addOfferForm.valid) return 

    console.log(this.addOfferForm.value)

    if(this.editOffer) {
      this.administrationService.editOffer(this.addOfferForm.value, this.editOfferId).subscribe(res => {
        console.log(res)
        this.store.dispatch(getOffer())
      })
    } else { 
      this.administrationService.addOffer(this.addOfferForm.value).subscribe(res => {
        console.log(res)
        this.store.dispatch(getOffer())
      })

      // const offerPhoto : OfferPhoto = {
      //   photoName: this.addOfferForm?.get('massageName')?.value + "Photo",
      //   photoByte: this.dataURLToByteArray(this.selectedImage ? this.selectedImage : ""),
      //   offerId: 1,
      //   photoType: "aaa"
      // }

      // this.administrationService.addOfferPhoto(offerPhoto).subscribe(res => {
      //   console.log(res)
      // })
    }
  }

  getAllOfferPhoto() {
    this.administrationService.getAllOfferPhoto().subscribe((res : OfferPhoto[]) => {
      console.log(res)
      this.offerPhotoList = res
    })
  }

  getOfferPhotoByOfferId(id : number | undefined) {
    if(!this.offerPhotoList) return
    const photoBytes = this.offerPhotoList.find(element => element.offerId == id)?.photoByte

    if(!photoBytes) return undefined
    
    return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + photoBytes);
  }

  addStatuate(content : string) {
    this.administrationService.addStatuate({id: 1, content : content}).subscribe(res => {
      console.log(res)
      this.store.dispatch(getStatuate())
    })
  }

  editStatuateMethod() {
    // if(!this.statuate) this.addStatuate(this.editStatuateContent)
    if(!this.statuate) { this.triggerEditStatuateMode(); return }
    const statuate = {
      id: this.statuate.id,
      content: this.editStatuateContent
    }
    this.administrationService.editStatuate(statuate).subscribe(res => {
      console.log(res)
      this.store.dispatch(getStatuate())
      this.triggerEditStatuateMode()
    })
  }

  openDeleteDialog(dialog: TemplateRef<any>, item : OfferItem | Massage) {
    this.dialogService.open(dialog, { context: item })
  }
  

  deleteOffer(id: number) {
    this.administrationService.deleteOffer(id).subscribe(res => {
      console.log(res)
      this.store.dispatch(getOffer())
    })  
  }

  deleteMassage(id: number) {
    this.administrationService.deleteMassage(id).subscribe(res => {
      console.log(res)
      this.store.dispatch(getMassage())
    })
    const offerId = this.offer?.find(offerItem => offerItem.massageId == id.toString())?.id
    if(offerId) {
      this.deleteOffer(offerId)
    }
  }

  getMassageById(id : string | undefined) {
    return this.massageList?.find(massage => massage.id == id)?.massageName
  }

  @ViewChild('imageInput') imageInput: ElementRef | undefined;

  selectImage(): void {
    // Ensure that the element is defined before accessing the click method
    if (this.imageInput) {
      const inputElement = this.imageInput.nativeElement as HTMLInputElement;
      inputElement.click();
    }
  }

  handleImageSelect(event: any): void {
    // Handle the selected image here
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // You can perform additional actions with the selected file
      console.log('Selected file:', selectedFile);
      this.readFileAsByteArray(selectedFile);

      setTimeout(() => {
        const photo : OfferPhoto = {
          photoName: "name",
          photoByte: this.selectedImage,
          photoType: "title",
          offerId: this.selectedOfferId
        }

        if(this.getOfferPhotoByOfferId(this.selectedOfferId)) {
          const id = this.offerPhotoList.find(element => element.offerId == this.selectedOfferId)?.id

          this.administrationService.editOfferPhoto(photo, id).subscribe(res => {
            console.log(res)
            this.getAllOfferPhoto()
          })
        } else {
          this.administrationService.addOfferPhoto(photo).subscribe(res => {
            console.log(res)
            this.getAllOfferPhoto()
          })
        }
      }, 100)
    }
  }

  handleImageUpdate(event : any) {
        // Handle the selected image here
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          // You can perform additional actions with the selected file
          console.log('Selected file:', selectedFile);
          this.readFileAsByteArray(selectedFile);
    
          setTimeout(() => {
            const photo : OfferPhoto = {
              photoName: "name",
              photoByte: this.selectedImage,
              photoType: "title",
              offerId: this.selectedOfferId
            }

            const id = this.offerPhotoList.find(element => element.offerId == this.selectedOfferId)?.id

            this.administrationService.editOfferPhoto(photo, id).subscribe(res => {
              console.log(res)
              this.getAllOfferPhoto()
            })
          }, 100)
        }
  }

  convertMinutesToHoursAndMinutes(minutes: string | undefined): string {
    const duration = moment.duration(minutes, 'minutes');
    const hours = duration.hours();
    const minutesPart = duration.minutes();
  
    let formattedResult = '';
  
    if (hours > 0) formattedResult += `${hours}h `;
  
    if (minutesPart > 0) formattedResult += `${minutesPart}min`;

    return formattedResult.trim();
  }

  deleteOfferPhoto(id? : number) {
    // const id = this.offerPhotoList.find(element => element.offerId == this.selectedOfferId)?.id


    this.administrationService.deleteOfferPhoto(id).subscribe(res => {
      console.log(res)
      this.getAllOfferPhoto()
    })
  }

    onFileSelected(event: any): void {
      const file: File = event.target.files[0];
  
      if (file) {
        this.readFileAsByteArray(file);
      }
    }
  
    private readFileAsByteArray(file: File): void {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        const result = e.target.result;
        this.selectedImage = this.dataURLToNumberArray(result);
        console.log(this.selectedImage) 
        // Now 'byteArr' contains the image data as a byte array
      };
  
      reader.readAsDataURL(file);
    }
  
    private dataURLToNumberArray(dataURL: string): number[] {
      const base64String = dataURL.split(',')[1];
      const byteCharacters = atob(base64String);
      const numberArray = new Array(byteCharacters.length);
    
      for (let i = 0; i < byteCharacters.length; i++) {
        numberArray[i] = byteCharacters.charCodeAt(i);
      }
    
      return numberArray;
    }

    setSelectedOfferId(id : number | undefined) {
      console.log(id)
      this.selectedOfferId = id
    }
  
    getAvailableMassageList() {
      this.availableMassageList = this.massageList?.filter(massage => {
        // Assuming 'this.offer.id' and 'massage.id' are of type string
        return !this.offer?.some(offerItem => offerItem.massageId === massage.id);
      });    

      console.log(this.availableMassageList)
    }
  
  prepareTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'massageName':
        const massageNameControl = this.addMassageForm?.get('massageName');
        
        if(massageNameControl?.value === '' && this.submitButtonClick) {
          tip += "Tytuł masażu wymagany"
        }
        break;
      case 'description':
        const descriptionControl = this.addMassageForm?.get('description');
        
        if(descriptionControl?.value === '' && this.submitButtonClick) {
          tip += "Opis masażu wymagany"
        }
        break;
      case 'type':
        const typeControl = this.addMassageForm?.get('appointmentType');
        
        if(typeControl?.value === '' && this.submitButtonClick) {
          tip += "Typ masażu wymagany"
        }
        break;
      }
      
      
      return tip
   }

   prepareOfferTooltip(type: string): string {
    let tip: string = ''
    switch (type) {
      case 'name':
        const offerNameControl = this.addOfferForm?.get('name');
        
        if(offerNameControl?.value === '' && this.submitButtonClick) {
          tip += "Tytuł oferty wymagany"
        }
        break;
      case 'duration':
        const durationControl = this.addOfferForm?.get('duration');
        
        if(durationControl?.value === '' && this.submitButtonClick) {
          tip += "Czas trwania oferty wymagany"
        }
        break;
      case 'price':
        const priceControl = this.addOfferForm?.get('price');
        
        if(priceControl?.value === '' && this.submitButtonClick) {
          tip += "Cena oferty wymagana"
        }
        break;
      case 'massage':
        const massageControl = this.addOfferForm?.get('massageId');
        
        if(massageControl?.value === '' && this.submitButtonClick) {
          tip += "Wybór masażu wymagana"
        }
        break;
      
      }
      
      
      
      return tip
   }
  

  selectMenuItem(key: 'offer' | 'regulations') {
    this.switchCase = key
  }

  toggleItemsVisibility(): void {
    this.showItems = !this.showItems;
  }
  
  togglePriceListVisibility(): void {
    this.showPriceList = !this.showPriceList;
  }

  toggleSidebarVisibility(): void {
    this.showSidebar = !this.showSidebar;
  }

  getBackground() {
    return `../../../../assets/background3.jpg`
  }

  ngOnDestroy(): void {
    if(this.offerSubscription) this.offerSubscription.unsubscribe()
    if(this.massageSubscription) this.massageSubscription.unsubscribe()
    if(this.statuateSubscription) this.statuateSubscription.unsubscribe()
  }
}

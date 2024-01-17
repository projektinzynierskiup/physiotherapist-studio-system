
export interface OfferItem {
   id?: number,
   name?: string,
   duration?: string,
   price?: string,
   massageId?: string
}

export interface OfferPhoto {
   id?: number,
   photoName?: string,
   photoByte?: number[];
   photoType?: string,
   offerId?: number,
}
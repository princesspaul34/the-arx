/* The Arx Real Estate – site configuration and property data.
   EDIT THIS FILE to change contact details or add/remove properties.
   Property photos: put files in /images/properties/ and list them in "images".
   If "images" is empty, a clean illustrated placeholder is shown instead. */
window.ARX = {
  config: {
    name: "The Arx",
    tagline: "Luxury. Legacy. Lifestyle.",
    // WhatsApp number in international format, digits only (no + or spaces)
    whatsapp: "2347031911819",
    phoneDisplay: "+234 703 191 1819",
    phoneLink: "+2347031911819",
    email: "info@thearx.com",
    address: "No. 1, First Floor, Beside Toko Academy, Bekaji, Jimeta-Yola",
    hours: "Mon – Sat: 8:00am – 6:00pm",
    siteUrl: "https://www.thearx.com",
    social: {
      facebook: "https://facebook.com/The ARX",
      instagram: "https://instagram.com/Thearxglobal",
      x: "https://x.com/TheArxGlobal01",
      linkedin: "https://linkedin.com/"
    }
  },

  // status: "sale" | "rent"   type: "House" | "Apartment" | "Land" | "Commercial"
  // price is in Naira. For rent, price is per year.
  properties: [
    {
      id: "citadel-cluster-1-200sqm-duplex",
      title: "Citadel Estate — Cluster 1, 200 sqm Duplex Plot",
      status: "sale", type: "Land", featured: true,
      price: 720000, location: "Behind IDP Camp Malkohi", city: "Jimeta-Yola, Adamawa",
      beds: 0, baths: 0, area: 200, parking: 0,
      description: "A 200 sqm residential plot at Citadel Estate, Malkohi, approved for a 2-bedroom duplex. Choose outright payment or a 6- or 12-month installment plan.",
      features: ["Citadel Estate", "200 sqm plot", "Approved 2-bedroom duplex", "Outright payment option", "6-month installment option", "12-month installment option"],
      images: ["images/listings/citadel-cluster-1-200sqm-duplex.jpg"], flyer: "images/listings/citadel-cluster-1-flyer.webp",
      officeAddress: "No. 1, First Floor, Beside Toko Academy, Bekaji, Jimeta-Yola",
      whatsapp: "2347031911819", phoneLink: "+2347031911819", phoneDisplay: "+234 703 191 1819",
      estatePlans: [{ size: 200, building: "2 bedroom duplex", outright: 720000, initial: 144000, sixMonth: 102000, twelveMonth: 54000 }]
    },
    {
      id: "citadel-cluster-1-450sqm-duplex",
      title: "Citadel Estate — Cluster 1, 450 sqm Duplex Plot",
      status: "sale", type: "Land", featured: true,
      price: 1500000, location: "Behind IDP Camp Malkohi", city: "Jimeta-Yola, Adamawa",
      beds: 0, baths: 0, area: 450, parking: 0,
      description: "A 450 sqm residential plot at Citadel Estate, Malkohi, approved for a 3-bedroom duplex. Choose outright payment or a 6- or 12-month installment plan.",
      features: ["Citadel Estate", "450 sqm plot", "Approved 3-bedroom duplex", "Outright payment option", "6-month installment option", "12-month installment option"],
      images: ["images/listings/citadel-cluster-1-450sqm-duplex.jpg"], flyer: "images/listings/citadel-cluster-1-flyer.webp",
      officeAddress: "No. 1, First Floor, Beside Toko Academy, Bekaji, Jimeta-Yola",
      whatsapp: "2347031911819", phoneLink: "+2347031911819", phoneDisplay: "+234 703 191 1819",
      estatePlans: [{ size: 450, building: "3 bedroom duplex", outright: 1500000, initial: 300000, sixMonth: 212500, twelveMonth: 112500 }]
    },
    {
      id: "citadel-cluster-1-650sqm-duplex",
      title: "Citadel Estate — Cluster 1, 650 sqm Duplex Plot",
      status: "sale", type: "Land", featured: true,
      price: 2400000, location: "Behind IDP Camp Malkohi", city: "Jimeta-Yola, Adamawa",
      beds: 0, baths: 0, area: 650, parking: 0,
      description: "A 650 sqm residential plot at Citadel Estate, Malkohi, approved for a 4-bedroom duplex. Choose outright payment or a 6- or 12-month installment plan.",
      features: ["Citadel Estate", "650 sqm plot", "Approved 4-bedroom duplex", "Outright payment option", "6-month installment option", "12-month installment option"],
      images: ["images/listings/citadel-cluster-1-650sqm-duplex.jpg"], flyer: "images/listings/citadel-cluster-1-flyer.webp",
      officeAddress: "No. 1, First Floor, Beside Toko Academy, Bekaji, Jimeta-Yola",
      whatsapp: "2347031911819", phoneLink: "+2347031911819", phoneDisplay: "+234 703 191 1819",
      estatePlans: [{ size: 650, building: "4 bedroom duplex", outright: 2400000, initial: 480000, sixMonth: 340000, twelveMonth: 180000 }]
    },
    {
      id: "citadel-cluster-2-200sqm-bungalow",
      title: "Citadel Estate — Cluster 2, 200 sqm Bungalow Plot",
      status: "sale", type: "Land", featured: true,
      price: 540000, location: "Behind IDP Camp Malkohi", city: "Jimeta-Yola, Adamawa",
      beds: 0, baths: 0, area: 200, parking: 0,
      description: "A 200 sqm residential plot at Citadel Estate, Malkohi, approved for a 2-bedroom bungalow. Choose outright payment or a 6- or 12-month installment plan.",
      features: ["Citadel Estate", "200 sqm plot", "Approved 2-bedroom bungalow", "Outright payment option", "6-month installment option", "12-month installment option"],
      images: ["images/listings/citadel-cluster-2-200sqm-bungalow.jpg"], flyer: "images/listings/citadel-cluster-2-flyer.webp",
      officeAddress: "No. 1, First Floor, Beside Toko Academy, Bekaji, Jimeta-Yola",
      whatsapp: "2347031911819", phoneLink: "+2347031911819", phoneDisplay: "+234 703 191 1819",
      estatePlans: [{ size: 200, building: "2 bedroom bungalow", outright: 540000, initial: 108000, sixMonth: 76500, twelveMonth: 40500 }]
    },
    {
      id: "citadel-cluster-2-450sqm-bungalow",
      title: "Citadel Estate — Cluster 2, 450 sqm Bungalow Plot",
      status: "sale", type: "Land", featured: true,
      price: 1200000, location: "Behind IDP Camp Malkohi", city: "Jimeta-Yola, Adamawa",
      beds: 0, baths: 0, area: 450, parking: 0,
      description: "A 450 sqm residential plot at Citadel Estate, Malkohi, approved for a 3-bedroom bungalow. Choose outright payment or a 6- or 12-month installment plan.",
      features: ["Citadel Estate", "450 sqm plot", "Approved 3-bedroom bungalow", "Outright payment option", "6-month installment option", "12-month installment option"],
      images: ["images/listings/citadel-cluster-2-450sqm-bungalow.jpg"], flyer: "images/listings/citadel-cluster-2-flyer.webp",
      officeAddress: "No. 1, First Floor, Beside Toko Academy, Bekaji, Jimeta-Yola",
      whatsapp: "2347031911819", phoneLink: "+2347031911819", phoneDisplay: "+234 703 191 1819",
      estatePlans: [{ size: 450, building: "3 bedroom bungalow", outright: 1200000, initial: 240000, sixMonth: 170000, twelveMonth: 90000 }]
    },
    {
      id: "citadel-cluster-2-650sqm-bungalow",
      title: "Citadel Estate — Cluster 2, 650 sqm Bungalow Plot",
      status: "sale", type: "Land", featured: true,
      price: 2160000, location: "Behind IDP Camp Malkohi", city: "Jimeta-Yola, Adamawa",
      beds: 0, baths: 0, area: 650, parking: 0,
      description: "A 650 sqm residential plot at Citadel Estate, Malkohi, approved for a 4-bedroom bungalow. Choose outright payment or a 6- or 12-month installment plan.",
      features: ["Citadel Estate", "650 sqm plot", "Approved 4-bedroom bungalow", "Outright payment option", "6-month installment option", "12-month installment option"],
      images: ["images/listings/citadel-cluster-2-650sqm-bungalow.jpg"], flyer: "images/listings/citadel-cluster-2-flyer.webp",
      officeAddress: "No. 1, First Floor, Beside Toko Academy, Bekaji, Jimeta-Yola",
      whatsapp: "2347031911819", phoneLink: "+2347031911819", phoneDisplay: "+234 703 191 1819",
      estatePlans: [{ size: 650, building: "4 bedroom bungalow", outright: 2160000, initial: 432000, sixMonth: 306000, twelveMonth: 162000 }]
    }
  ]
};

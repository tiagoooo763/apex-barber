export const COMPANY_INFO = {
  name: 'APEX BARBER',
  tagline: 'Barbeiro Visagista',
  slogan: 'Estilo e excelência andam lado a lado.',
  heroSubtitle: 'Mais do que um corte. Uma experiência pensada para valorizar sua imagem.',
  about: 'Somos barbearia Visagista e aqui na Apex Barber, estilo e excelência andam lado a lado. Localizada em Nova Porteirinha-MG, somos uma barbearia moderna com essência clássica, dedicada a valorizar a imagem do homem que se cuida. Oferecemos cortes personalizados, barba alinhada, cuidados especiais e planos mensais exclusivos para quem não abre mão de estar sempre no seu melhor.',
  address: {
    street: 'Av. Castelo Branco, 127',
    city: 'Nova Porteirinha',
    state: 'MG',
    zip: '39525-000',
    full: 'Av. Castelo Branco, 127 - Nova Porteirinha - MG, 39525-000'
  },
  phone: {
    display: '(38) 99747-5522',
    raw: '5538997475522',
    tel: '+5538997475522'
  },
  instagram: {
    handle: '@apexbarberofc',
    url: 'https://www.instagram.com/apexbarberofc/'
  },
  googleReviews: {
    rating: 5.0,
    totalCount: 37,
    source: 'Google'
  },
  whatsapp: {
    number: '5538997475522',
    defaultMessage: 'Olá! Vim pelo site da Apex Barber e gostaria de agendar um horário.',
    getUrl: (customText?: string) => {
      const msg = encodeURIComponent(customText || 'Olá! Vim pelo site da Apex Barber e gostaria de agendar um horário.');
      return `https://wa.me/5538997475522?text=${msg}`;
    }
  },
  maps: {
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Castelo+Branco,+127,+Nova+Porteirinha+-+MG,+39525-000',
    embedUrl: 'https://maps.google.com/maps?q=Av.+Castelo+Branco,+127,+Nova+Porteirinha+-+MG&t=&z=16&ie=UTF8&iwloc=&output=embed'
  },
  hours: [
    { days: 'Segunda-feira', hours: '09:00 – 19:30' },
    { days: 'Terça a Sexta', hours: '08:30 – 20:00' },
    { days: 'Sábado', hours: '08:00 – 19:30' },
    { days: 'Domingo', hours: 'Fechado' }
  ]
};

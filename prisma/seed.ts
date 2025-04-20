import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: 'Tomato',
        price: 20.5,
        imageUrl: 'https://abcfruits.com/wp-content/uploads/2022/08/14.png ',
      },
      {
        name: 'Onion',
        price: 15.75,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8q08WhpczEznhtGN8yMjO4H4QJtfm351g9w&s ',
      },
      {
        name: 'Carrot',
        price: 25.0,
        imageUrl: 'https://www.hhs1.com/hubfs/carrots%20on%20wood-1.jpg ',
      },
      {
        name: 'Potato',
        price: 18.0,
        imageUrl: 'https://cdn.mos.cms.futurecdn.net/iC7HBvohbJqExqvbKcV3pP-1200-80.jpg ',
      },
      {
        name: 'Cabbage',
        price: 22.0,
        imageUrl: 'https://assets.clevelandclinic.org/transform/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg ',
      },
      {
        name: 'Cauliflower',
        price: 28.0,
        imageUrl: 'https://www.usatoday.com/gcdn/media/2020/08/29/USATODAY/usatsports/247WallSt.com-247WS-731822-imageforentry6-9di.jpg?crop=1365,768,x0,y0 ',
      },
      {
        name: 'Brinjal',
        price: 30.0,
        imageUrl: 'https://5.imimg.com/data5/BV/NC/MY-51202890/fresh-brinjal.jpg ',
      },
      {
        name: 'Green Chilli',
        price: 40.0,
        imageUrl: 'https://www.greendna.in/cdn/shop/products/green_chilli.jpg?v=1562414368 ',
      },
      {
        name: 'Bell Pepper (Capsicum)',
        price: 35.0,
        imageUrl: 'https://image.myupchar.com/353/webp/shimla-mirch-ke-fayde-in-hindi-2.webp ',
      },
      {
        name: 'Beetroot',
        price: 32.0,
        imageUrl: 'https://www.fitterfly.com/blog/wp-content/uploads/2022/09/Is-Beetroot-Good-for-Diabetes-2-1200x720.webp ',
      },
      {
        name: 'Radish',
        price: 20.0,
        imageUrl: 'https://healthokglobal.com/img/blog429.webp ',
      },
      {
        name: 'Cucumber',
        price: 24.0,
        imageUrl: 'https://seed2plant.in/cdn/shop/products/saladcucumberseeds.jpg?v=1603435556 ',
      },
      {
        name: 'Bitter Gourd',
        price: 26.0,
        imageUrl: 'https://gardeningcentre.in/cdn/shop/files/bittergourdsmal.jpg?v=1706029185 ',
      },
      {
        name: 'Pumpkin',
        price: 15.0,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlJ4DC-9a-eVRpimfSxTXAvyUZ3GJepHIHMg&s ',
      },
      {
        name: 'Spinach',
        price: 18.5,
        imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80 ',
      },
      {
        name: 'Coriander Leaves',
        price: 10.0,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBTOs3xyrACxgflFjPyJXi_k8cCf0iH4aKkA&s ',
      },
      {
        name: 'Fenugreek Leaves (Methi)',
        price: 14.0,
        imageUrl: 'https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-104787524/104787524.jpg ',
      },
      {
        name: 'Garlic',
        price: 45.0,
        imageUrl: 'https://tildaricelive.s3.eu-central-1.amazonaws.com/wp-content/uploads/2022/04/25115428/Full-garlics-edit-1440x970.jpg ',
      },
      {
        name: 'Ginger',
        price: 50.0,
        imageUrl: 'https://media.post.rvohealth.io/wp-content/uploads/2023/09/ginger-root-still-life-1296x728-header.jpg ',
      },
      {
        name: 'Lemon',
        price: 12.0,
        imageUrl: 'https://m.media-amazon.com/images/I/61wl85nUOUL.AC_UF1000,1000_QL80.jpg ',
      },
    ],
  });

  console.log('✅ Seeded 20 vegetable/fruit items!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  })
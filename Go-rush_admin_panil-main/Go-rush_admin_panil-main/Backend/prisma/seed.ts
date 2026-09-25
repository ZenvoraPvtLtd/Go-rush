import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding mock data...');
  
  // Create Users
  for(let i = 1; i <= 20; i++) {
    await prisma.user.upsert({
      where: { email: `user${i}@test.com` },
      update: {},
      create: {
        name: `Rider ${i}`,
        email: `user${i}@test.com`,
        phone: `98765432${i.toString().padStart(2, '0')}`,
        password: 'hashedpassword',
      },
    });
  }

  // Create Drivers
  for(let i = 1; i <= 10; i++) {
    await prisma.driver.upsert({
      where: { email: `driver${i}@test.com` },
      update: {},
      create: {
        name: `Driver ${i}`,
        email: `driver${i}@test.com`,
        phone: `99965432${i.toString().padStart(2, '0')}`,
        password: 'hashedpassword',
        vehicleDetails: 'Toyota Prius',
        status: i % 3 === 0 ? 'ONLINE' : 'OFFLINE',
        isKycApproved: true,
      },
    });
  }
  
  // Create Rides
  const users = await prisma.user.findMany({ take: 5 });
  const drivers = await prisma.driver.findMany({ take: 5 });
  
  if (users.length > 0 && drivers.length > 0) {
    for (let i = 0; i < 15; i++) {
      const rider = users[i % users.length];
      const driver = drivers[i % drivers.length];
      const statuses = ['COMPLETED', 'CANCELLED', 'IN_PROGRESS'];
      const status = statuses[i % 3];
      
      await prisma.ride.create({
        data: {
          riderId: rider.id,
          driverId: driver.id,
          pickupLat: 28.7041 + (Math.random() * 0.1),
          pickupLng: 77.1025 + (Math.random() * 0.1),
          dropoffLat: 28.7041 + (Math.random() * 0.1),
          dropoffLng: 77.1025 + (Math.random() * 0.1),
          status: status,
          fare: status === 'COMPLETED' ? Math.floor(Math.random() * 500) + 100 : null,
          paymentStatus: status === 'COMPLETED' ? 'PAID' : 'PENDING'
        }
      });
    }
  }

  console.log('Seeding complete!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

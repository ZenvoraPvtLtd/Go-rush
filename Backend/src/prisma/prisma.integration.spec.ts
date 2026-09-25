import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service.js';

describe('PrismaService Integration', () => {
  let prisma: PrismaService;
  let testUserId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    await prisma.onModuleInit();
  });

  afterAll(async () => {
    // Cleanup any lingering data just in case
    if (testUserId) {
      await prisma.user.deleteMany({ where: { id: testUserId } });
    }
    await prisma.onModuleDestroy();
  });

  it('should create, read, and delete a User in PostgreSQL', async () => {
    // 1. Create User
    const newUser = await prisma.user.create({
      data: {
        name: 'Integration Test User',
        email: 'integration_test_user@gorush.local',
        phone: '+15555555555',
        password: 'hashed_password_mock',
      },
    });

    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
    testUserId = newUser.id;

    // 2. Read User
    const foundUser = await prisma.user.findUnique({
      where: { id: testUserId },
    });

    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe('integration_test_user@gorush.local');

    // 3. Delete User (cleanup)
    await prisma.user.delete({
      where: { id: testUserId },
    });
    
    // reset to avoid afterAll double delete error
    testUserId = '';
  });
});

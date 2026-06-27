import prisma from './client.js'

const announcements = [
  {
    title: 'Продам ноутбук ASUS',
    description: 'Відмінний стан, 16GB RAM, SSD 512GB',
    price: 18000,
    category: 'sale',
    contactInfo: '0991234567',
  },
  {
    title: 'Ремонт компʼютерів',
    description: 'Швидкий ремонт ноутбуків та ПК у вашому місті',
    price: 500,
    category: 'service',
    contactInfo: 'service@example.com',
  },
  {
    title: 'Потрібен Node.js розробник',
    description: 'Шукаємо junior Node.js developer на part-time',
    price: 25000,
    category: 'job',
    contactInfo: 'hr@example.com',
  },
]

await prisma.announcement.createMany({ data: announcements })
await prisma.$disconnect()

console.log('Seed completed')

'use server';
import { db } from '../../../lib/db';
import { auth } from '@clerk/nextjs/server';
import { Record } from '../../../types/Record';

async function getRecords(): Promise<{
  records?: Record[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    //find all the records of the user
    const records = await db.expense.findMany({
      where: { userId },
      orderBy: {
        date: 'desc', // Sort by the `date` field in descending order
      },
      take: 10, // Limit the request to 10 records
    });

    return { records };
  } catch (error) {
    console.error('Error fetching records:', error); // Log the error
    return { error: 'Database error' };
  }
}

export default getRecords;
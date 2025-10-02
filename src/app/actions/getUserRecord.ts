'use server';

import { db } from '../../../lib/db';
import { auth } from '@clerk/nextjs/server';


async function getUserRecord(): Promise<{
  record?: number;
  daysWithRecords?: number;
  error?: string;
}> {

    const { userId } = await auth();

    if (!userId) {
      return { error: 'User not found' };
    }

    try{
        const records = await db.expense.findMany({
            where: {userId},
        });

        //calculate total amount of expenses
        const record = records.reduce((sum,record)=> sum + record.amount, 0);

        //calculate num days with valid expenses
        const daysWithRecords = records.filter(
          (record) => record.amount > 0 //positive expenses only
        ).length;

        //with days with record, we can use it for average.
        return { record, daysWithRecords }; //returns summary
    } catch (error) {
        console.error('Error fetching expenses:', error); 
        return { error: 'Database error' };
    }

  }

  export default getUserRecord
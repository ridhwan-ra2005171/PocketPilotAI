'use server';
import { db } from '../../../lib/db';
import { auth } from '@clerk/nextjs/server';

async function getBestWorstExpense():Promise<{
    bestExpense?: number;
    worstExpense?: number;
    error?: string;
}>{
    const { userId } = await auth();

    if (!userId) {
        return { error: 'User not found' };
    }

    try{
        //get all expenses for authenticated user
        const records = await db.expense.findMany({
            where: {userId},
            select: {amount:true}, //select field with 'amount'
        })

        if (!records || records.length === 0) {
            return { bestExpense:0, worstExpense:0 };//default values
        }

        const amount = records.map((record)=> record.amount);

        //calculate the best and worst expense
        const bestExpense = Math.max(...amount);
        const worstExpense = Math.min(...amount);   

        return { bestExpense, worstExpense };

    } catch(error){
        console.error('Error fetching expenses:', error); 
        return { error: 'Database error' };
    }
}
export default getBestWorstExpense  
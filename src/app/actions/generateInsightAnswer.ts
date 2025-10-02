'use server'

import { checkUser } from "../../../lib/checkUser"
import { db } from "../../../lib/db"
import { generateAIAnswer, ExpenseRecord } from "../../../lib/ai"

export async function generateInsightAnswer(question: string): Promise<string> {
    try {
        const user = await checkUser();
        if (!user) {
            throw new Error('User do not have access')
        }

        //get the user's recent expenses (30days)
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

        const expenses = await db.expense.findMany({
            where: {
                userId: user.clerkUserId,
                createdAt: {
                    gte: thirtyDaysAgo, //greater thn equal
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 50, // Limit to recent 50 expenses for analysis
        });

        //convert to format by AI
        const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
            id: expense.id,
            amount: expense.amount,
            category: expense.category || 'Other',
            description: expense.text,
            date: expense.createdAt.toISOString(),
        }))

        //to generrate AI answer
        const answer = await generateAIAnswer(question, expenseData);

        return answer

    } catch (e) {
        console.error('Error generating insights:', e);
        return "A detailed response couldn't be generated at this time. Please refresh the insights or verify your network connection."
    }
}
'use server'

import { checkUser } from "../../../lib/checkUser"
import { db } from "../../../lib/db"
import { generateExpenseInsights, AIInsight, ExpenseRecord } from "../../../lib/ai"

export async function getAIInsights(): Promise<AIInsight[]> {
    try {
        const user = await checkUser()

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
                    gte: thirtyDaysAgo //greater than/equal
                },
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 50, // Limit the request to 50 expenses
        });

        if (expenses.length === 0) {
            //return default for new users
            return [
                {
                    id: 'welcome-1',
                    type: 'info',
                    title: 'Welcome to PocketPilot AI!',
                    message:
                        'Start logging your expenses to receive smart, personalized insights into your spending habits.',
                    action: 'Log your first expense',
                    confidence: 1.0,
                },

                {
                    id: 'welcome-2',
                    type: 'tip',
                    title: 'Track Regularly',
                    message:
                        'To get the most accurate insights, try recording your expenses every day. It helps the AI understand your patterns better.',
                    action: 'Enable daily reminders',
                    confidence: 1.0,
                }
            ];
        }

        //convert it to format by AI
        const expenseData: ExpenseRecord[] = expenses.map((expense) => ({
            id: expense.id,
            amount: expense.amount,
            category: expense.category,
            description: expense.text,
            date: expense.createdAt.toISOString(),
        }));

        //generate insights via AI
        const insights = await generateExpenseInsights(expenseData);
        return insights;



    } catch (e) {
        console.error('Error getting AI insights:', e);

        // Return fallback insights
        return [
            {
                id: 'error-1',
                type: 'warning',
                title: 'Insights Temporarily Unavailable',
                message: "We’re currently unable to analyze your expenses. Please try again shortly.",
                action: 'Retry analysis',
                confidence: 0.5,
            },
        ];
    }
}

export default getAIInsights

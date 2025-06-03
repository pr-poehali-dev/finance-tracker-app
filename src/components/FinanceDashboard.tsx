import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionForm from "./TransactionForm";
import AnalyticsTabs from "./AnalyticsTabs";
import ExpenseCategories from "./ExpenseCategories";
import TransactionHistory from "./TransactionHistory";
import Icon from "@/components/ui/icon";

const FinanceDashboard = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "income",
      amount: 50000,
      category: "Зарплата",
      date: "2024-06-01",
      description: "Основная работа",
    },
    {
      id: 2,
      type: "expense",
      amount: 15000,
      category: "Продукты",
      date: "2024-06-02",
      description: "Продуктовый магазин",
    },
    {
      id: 3,
      type: "expense",
      amount: 8000,
      category: "Транспорт",
      date: "2024-06-02",
      description: "Заправка автомобиля",
    },
    {
      id: 4,
      type: "expense",
      amount: 3500,
      category: "Развлечения",
      date: "2024-06-03",
      description: "Кино с друзьями",
    },
    {
      id: 5,
      type: "income",
      amount: 12000,
      category: "Фриланс",
      date: "2024-06-03",
      description: "Веб-разработка",
    },
  ]);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTransaction, ...transactions]);
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-2 font-montserrat">
          Финансовый трекер
        </h1>
        <p className="text-slate-600 text-lg">
          Управляйте своими финансами с умом
        </p>
      </div>

      {/* Обзор баланса */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Icon name="TrendingUp" size={16} />
              Доходы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalIncome.toLocaleString()} ₽
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Icon name="TrendingDown" size={16} />
              Расходы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalExpenses.toLocaleString()} ₽
            </div>
          </CardContent>
        </Card>

        <Card
          className={`${balance >= 0 ? "bg-gradient-to-r from-purple-500 to-purple-600" : "bg-gradient-to-r from-orange-500 to-orange-600"} text-white border-0`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium opacity-90 flex items-center gap-2">
              <Icon name="Wallet" size={16} />
              Баланс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {balance.toLocaleString()} ₽
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="add">Добавить</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="history">История</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExpenseCategories transactions={transactions} />
            <TransactionHistory transactions={transactions.slice(0, 5)} />
          </div>
        </TabsContent>

        <TabsContent value="add">
          <TransactionForm onAddTransaction={addTransaction} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTabs transactions={transactions} />
        </TabsContent>

        <TabsContent value="history">
          <TransactionHistory transactions={transactions} showAll={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinanceDashboard;

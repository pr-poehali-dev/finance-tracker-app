import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import Icon from "@/components/ui/icon";

const AnalyticsTabs = ({ transactions }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const generatePeriodData = (period) => {
    const now = new Date();
    const data = [];

    if (period === "week") {
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString("ru-RU", { weekday: "short" });

        const dayTransactions = transactions.filter((t) => {
          const tDate = new Date(t.date);
          return tDate.toDateString() === date.toDateString();
        });

        const income = dayTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
        const expenses = dayTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        data.push({ name: dayName, income, expenses });
      }
    } else if (period === "month") {
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const day = date.getDate();

        const dayTransactions = transactions.filter((t) => {
          const tDate = new Date(t.date);
          return tDate.toDateString() === date.toDateString();
        });

        const income = dayTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
        const expenses = dayTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);

        if (i % 5 === 0) {
          // Показываем каждый 5-й день
          data.push({ name: day.toString(), income, expenses });
        }
      }
    }

    return data;
  };

  const chartData = generatePeriodData(selectedPeriod);

  const chartConfig = {
    income: {
      label: "Доходы",
      color: "#10b981",
    },
    expenses: {
      label: "Расходы",
      color: "#ef4444",
    },
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} />
            Аналитика по периодам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={selectedPeriod}
            onValueChange={setSelectedPeriod}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="week">Неделя</TabsTrigger>
              <TabsTrigger value="month">Месяц</TabsTrigger>
              <TabsTrigger value="quarter">Квартал</TabsTrigger>
              <TabsTrigger value="year">Год</TabsTrigger>
            </TabsList>

            <TabsContent value="week" className="mt-6">
              <div className="h-80 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="income"
                        fill="var(--color-income)"
                        name="Доходы"
                      />
                      <Bar
                        dataKey="expenses"
                        fill="var(--color-expenses)"
                        name="Расходы"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="month" className="mt-6">
              <div className="h-80 w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="income"
                        stroke="var(--color-income)"
                        name="Доходы"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="expenses"
                        stroke="var(--color-expenses)"
                        name="Расходы"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="quarter" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <Icon
                  name="Calendar"
                  size={48}
                  className="mx-auto mb-4 opacity-50"
                />
                <p>
                  Аналитика по кварталам будет доступна после накопления данных
                </p>
              </div>
            </TabsContent>

            <TabsContent value="year" className="mt-6">
              <div className="text-center py-12 text-slate-500">
                <Icon
                  name="Calendar"
                  size={48}
                  className="mx-auto mb-4 opacity-50"
                />
                <p>Годовая аналитика будет доступна после накопления данных</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="TrendingUp" size={18} className="text-emerald-600" />
              Структура доходов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions
                .filter((t) => t.type === "income")
                .reduce((acc, t) => {
                  acc[t.category] = (acc[t.category] || 0) + t.amount;
                  return acc;
                }, {}).length === 0 ? (
                <p className="text-slate-500">Нет данных о доходах</p>
              ) : (
                Object.entries(
                  transactions
                    .filter((t) => t.type === "income")
                    .reduce((acc, t) => {
                      acc[t.category] = (acc[t.category] || 0) + t.amount;
                      return acc;
                    }, {}),
                ).map(([category, amount]) => (
                  <div
                    key={category}
                    className="flex justify-between items-center"
                  >
                    <span className="text-slate-700">{category}</span>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">
                        {amount.toLocaleString()} ₽
                      </div>
                      <div className="text-xs text-slate-500">
                        {((amount / totalIncome) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="TrendingDown" size={18} className="text-red-600" />
              Структура расходов
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                transactions
                  .filter((t) => t.type === "expense")
                  .reduce((acc, t) => {
                    acc[t.category] = (acc[t.category] || 0) + t.amount;
                    return acc;
                  }, {}),
              ).map(([category, amount]) => (
                <div
                  key={category}
                  className="flex justify-between items-center"
                >
                  <span className="text-slate-700">{category}</span>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">
                      {amount.toLocaleString()} ₽
                    </div>
                    <div className="text-xs text-slate-500">
                      {((amount / totalExpenses) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsTabs;

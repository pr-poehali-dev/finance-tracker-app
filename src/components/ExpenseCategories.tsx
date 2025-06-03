import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const ExpenseCategories = ({ transactions }) => {
  const expensesByCategory = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const totalExpenses = Object.values(expensesByCategory).reduce(
    (sum, amount) => sum + amount,
    0,
  );
  const sortedCategories = Object.entries(expensesByCategory).sort(
    ([, a], [, b]) => b - a,
  );

  const getCategoryIcon = (category) => {
    const icons = {
      Продукты: "ShoppingCart",
      Транспорт: "Car",
      Развлечения: "Gamepad2",
      Коммунальные: "Home",
      Медицина: "Heart",
      Одежда: "Shirt",
      Образование: "BookOpen",
    };
    return icons[category] || "Circle";
  };

  const getCategoryColor = (category) => {
    const colors = {
      Продукты: "bg-orange-100 text-orange-700",
      Транспорт: "bg-blue-100 text-blue-700",
      Развлечения: "bg-purple-100 text-purple-700",
      Коммунальные: "bg-green-100 text-green-700",
      Медицина: "bg-red-100 text-red-700",
      Одежда: "bg-pink-100 text-pink-700",
      Образование: "bg-indigo-100 text-indigo-700",
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="PieChart" size={20} />
          Расходы по категориям
        </CardTitle>
      </CardHeader>
      <CardContent>
        {sortedCategories.length > 0 ? (
          <div className="space-y-4">
            {sortedCategories.map(([category, amount]) => {
              const percentage = ((amount / totalExpenses) * 100).toFixed(1);
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${getCategoryColor(category)}`}
                      >
                        <Icon name={getCategoryIcon(category)} size={16} />
                      </div>
                      <span className="font-medium text-slate-700">
                        {category}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">
                        {amount.toLocaleString()} ₽
                      </div>
                      <div className="text-sm text-slate-500">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Icon
              name="PieChart"
              size={48}
              className="mx-auto mb-4 opacity-50"
            />
            <p>Нет данных о расходах</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseCategories;

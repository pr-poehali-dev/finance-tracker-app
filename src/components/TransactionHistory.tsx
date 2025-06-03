import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const TransactionHistory = ({ transactions, showAll = false }) => {
  const displayTransactions = showAll ? transactions : transactions.slice(0, 5);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getTransactionIcon = (type, category) => {
    if (type === "income") return "TrendingUp";

    const categoryIcons = {
      Продукты: "ShoppingCart",
      Транспорт: "Car",
      Развлечения: "Gamepad2",
      Коммунальные: "Home",
      Медицина: "Heart",
      Одежда: "Shirt",
      Образование: "BookOpen",
    };
    return categoryIcons[category] || "Minus";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Clock" size={20} />
          {showAll ? "Все транзакции" : "Последние операции"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {displayTransactions.length > 0 ? (
          <div className="space-y-4">
            {displayTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "income"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <Icon
                      name={getTransactionIcon(
                        transaction.type,
                        transaction.category,
                      )}
                      size={16}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">
                      {transaction.category}
                    </div>
                    <div className="text-sm text-slate-600">
                      {transaction.description || "Без описания"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-bold text-lg ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {transaction.amount.toLocaleString()} ₽
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Icon
              name="Receipt"
              size={48}
              className="mx-auto mb-4 opacity-50"
            />
            <p>Нет транзакций</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;

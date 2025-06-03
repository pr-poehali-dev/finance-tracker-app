import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";

const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
  });

  const incomeCategories = [
    "Зарплата",
    "Фриланс",
    "Инвестиции",
    "Подарки",
    "Другое",
  ];
  const expenseCategories = [
    "Продукты",
    "Транспорт",
    "Развлечения",
    "Коммунальные",
    "Медицина",
    "Одежда",
    "Образование",
    "Другое",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.type && formData.amount && formData.category) {
      onAddTransaction({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({ type: "", amount: "", category: "", description: "" });
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Plus" size={20} />
          Добавить транзакцию
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Тип операции
            </label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value, category: "" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">
                  <div className="flex items-center gap-2">
                    <Icon
                      name="TrendingUp"
                      size={16}
                      className="text-emerald-600"
                    />
                    Доход
                  </div>
                </SelectItem>
                <SelectItem value="expense">
                  <div className="flex items-center gap-2">
                    <Icon
                      name="TrendingDown"
                      size={16}
                      className="text-red-600"
                    />
                    Расход
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Сумма (₽)
            </label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              placeholder="Введите сумму"
              min="0"
              step="0.01"
            />
          </div>

          {formData.type && (
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">
                Категория
              </label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {(formData.type === "income"
                    ? incomeCategories
                    : expenseCategories
                  ).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Описание (необязательно)
            </label>
            <Input
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Добавьте описание"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700"
            disabled={!formData.type || !formData.amount || !formData.category}
          >
            <Icon name="Plus" size={16} />
            Добавить транзакцию
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TransactionForm;

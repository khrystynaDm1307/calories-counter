import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/day.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  array: Array<IProduct> = [
    { name: 'Гречана каша', calories: 108 },
    { name: 'Манна каша', calories: 77 },
    { name: 'Вівсяна каша', calories: 88 },
    { name: 'Рисова каша', calories: 79 },
    { name: 'Маргарин вершковий', calories: 746 },
    { name: 'Майонез 67%', calories: 624 },
    { name: 'Олія оливкова', calories: 898 },
    { name: 'Олія соняшникова', calories: 899 },
    { name: 'Масло вершкове 82,5%', calories: 747 },
    { name: 'Йогурт 1.5%', calories: 65 },
    { name: 'Кефір 2,5%', calories: 51 },
    { name: 'Молоко 3,2%', calories: 58 },
    { name: 'Молоко коров’яче сире', calories: 63 },
    { name: 'Сметана 20%', calories: 208 },
    { name: 'Сирки з сирної маси', calories: 344 },
    { name: 'Сир сулугуні', calories: 293 },
    { name: 'Омлет', calories: 181 },
    { name: 'Яйце куряче', calories: 153 },
    { name: 'Ковбаса', calories: 257 },
    { name: 'Салямі', calories: 576 },
    { name: 'Сосиски Яловичі', calories: 229 },
    { name: 'Курячі Сосиски', calories: 242 },
    { name: 'Баранина', calories: 201 },
    { name: 'Яловичина', calories: 191 },
    { name: 'Кролик', calories: 197 },
    { name: 'Свинина', calories: 418 },
    { name: 'Телятина', calories: 91 },
    { name: 'Індичка', calories: 192 },
    { name: 'Кури', calories: 161 },
    { name: 'Качки', calories: 348 },
    { name: 'Карась', calories: 84 },
    { name: 'Лосось', calories: 200 },
    { name: 'Окунь', calories: 90 },
    { name: 'Скумбрія', calories: 158 },
    { name: 'Форель', calories: 99 },
    { name: 'Хек', calories: 84 },
    { name: 'Кабачки', calories: 30 },
    { name: 'Капуста білокачанна', calories: 31 },
    { name: 'Цибуля ріпчаста', calories: 42 },
    { name: 'Морква', calories: 29 },
    { name: 'Огірки грунтові', calories: 15 },
    { name: 'Перець червоний солодкий', calories: 26 },
    { name: 'Петрушка (зелень)', calories: 45 },
    { name: 'Салат', calories: 15 },
    { name: 'Абрикоси', calories: 44 },
    { name: 'Ананас', calories: 49 },
    { name: 'Апельсин', calories: 38 },
    { name: 'Банани', calories: 98 },
    { name: 'Виноград', calories: 73 },
    { name: 'Вишня', calories: 46 },
    { name: 'Груша', calories: 42 },
    { name: 'Диня', calories: 34 },
    { name: 'Лимон', calories: 30 },
    { name: 'Малина', calories: 43 },
    { name: 'Мандарин', calories: 39 },
    { name: 'Хурма', calories: 61 },
    { name: 'Яблука', calories: 48 },
    { name: 'Варення', calories: 286 },
    { name: 'Вафлі', calories: 425 },
    { name: 'Зефір', calories: 295 },
    { name: 'Цукерки шоколадні', calories: 576 },
    { name: 'Мед', calories: 312 },
    { name: 'Морозиво', calories: 278 },
    { name: 'Печиво здобне', calories: 447 },
    { name: 'Цукор', calories: 377 },
    { name: 'Шоколад', calories: 552 },
    { name: 'Хліб', calories: 327 }
  ]
  constructor() { }

  public getProducts() {
    return this.array;
  }
}

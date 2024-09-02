from django.core.management.base import BaseCommand
from product.models import Product

class Command(BaseCommand):
    help = 'Populates the database with initial product data'

    def handle(self, *args, **kwargs):
        products = [
            {"name": "Desk Lamp", "description": "Adjustable desk lamp with LED light.", "price": 29.99, "in_stock": True},
            {"name": "External Hard Drive", "description": "1TB external hard drive for data storage.", "price": 59.99, "in_stock": True}
        ]

        for product_data in products:
            Product.objects.create(**product_data)

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with initial products'))

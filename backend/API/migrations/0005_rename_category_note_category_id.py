# Generated by Django 4.2.3 on 2024-01-08 17:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_remove_note_categories_note_category'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='category',
            new_name='category_id',
        ),
    ]
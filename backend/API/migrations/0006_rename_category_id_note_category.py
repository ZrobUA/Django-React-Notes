# Generated by Django 4.2.3 on 2024-01-10 13:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0005_rename_category_note_category_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='note',
            old_name='category_id',
            new_name='category',
        ),
    ]

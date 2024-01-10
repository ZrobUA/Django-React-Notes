# Generated by Django 4.2.3 on 2024-01-08 17:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_remove_note_category_note_categories_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='categories',
        ),
        migrations.AddField(
            model_name='note',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='API.category'),
        ),
    ]

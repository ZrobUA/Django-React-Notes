# Generated by Django 4.2.3 on 2024-01-08 17:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0002_note_category_text_alter_category_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='category',
        ),
        migrations.AddField(
            model_name='note',
            name='categories',
            field=models.ManyToManyField(blank=True, related_name='notes', to='API.category'),
        ),
        migrations.AlterField(
            model_name='note',
            name='category_text',
            field=models.CharField(max_length=100),
        ),
    ]

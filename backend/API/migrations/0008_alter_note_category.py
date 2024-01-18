# Generated by Django 4.2.3 on 2024-01-18 11:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0007_alter_note_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='notes', to='API.category'),
        ),
    ]

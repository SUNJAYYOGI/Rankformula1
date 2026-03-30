from django.contrib import admin
from django import forms
from .models import Match, Package, Lead, PaymentSetting, WinningProof, RecentWinner, SiteSetting

# ==========================================
# 1. NAYA FORM: Fix ke sath
# ==========================================
class MatchAdminForm(forms.ModelForm):
    # NAYA FIX: Humne poore field ko hi override kar diya
    match_time = forms.DateTimeField(
        widget=forms.DateTimeInput(
            attrs={
                'type': 'datetime-local', 
                'class': 'vTextField',
                'step': '1800' # 30 mins ka gap
            }
        ),
        help_text="Match start hone ka time select karein (Timer yahan tak chalega)"
    )

    class Meta:
        model = Match
        fields = '__all__'

# ==========================================
# 2. MODEL REGISTRATIONS
# ==========================================

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    form = MatchAdminForm 
    list_display = ('title', 'team_1_name', 'team_2_name', 'match_time', 'is_active')
    list_filter = ('is_active', 'match_time')

@admin.register(Package)
class PackageAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'slots_left', 'is_active')

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ('phone_number', 'package', 'utr_number', 'created_at', 'is_converted')
    list_filter = ('is_converted', 'package')

@admin.register(PaymentSetting)
class PaymentSettingAdmin(admin.ModelAdmin):
    list_display = ('upi_id', 'payee_name', 'is_active')

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('whatsapp_number', 'telegram_link', 'is_active')

@admin.register(WinningProof)
class WinningProofAdmin(admin.ModelAdmin):
    list_display = ('title', 'winning_amount', 'is_active', 'created_at')

@admin.register(RecentWinner)
class RecentWinnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'rank', 'amount_won', 'is_active')
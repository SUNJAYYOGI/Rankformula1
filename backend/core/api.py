from datetime import datetime
from ninja import NinjaAPI, Schema
from typing import List, Optional
from django.shortcuts import get_object_or_404

# Saare models import kiye (dhyaan rakhna koi miss na ho)
from .models import Match, Package, Lead, PaymentSetting, WinningProof, RecentWinner, SiteSetting

api = NinjaAPI(title="Rank Formula API")

# ==========================================
# 1. SCHEMAS (Data format definitions)
# ==========================================

class MatchSchema(Schema):
    id: int
    title: str
    team_1_name: str
    team_1_color: str
    team_1_full_name: str
    team_2_name: str
    team_2_color: str
    team_2_full_name: str
    match_time: datetime
    location: str
    
    # FIX: Optional lagana zaroori hai
    bg_image_url: Optional[str] = None
    poster_image_url: Optional[str] = None

    @staticmethod
    def resolve_bg_image_url(obj):
        if obj.bg_image:
            return f"https://rank-backend-test.onrender.com{obj.bg_image.url}"
        return None

    @staticmethod
    def resolve_poster_image_url(obj):
        if obj.poster_image:
            return f"https://rank-backend-test.onrender.com{obj.poster_image.url}"
        return None

    @staticmethod
    def resolve_poster_image_url(obj):
        if obj.poster_image:
            return f"https://rank-backend-test.onrender.com{obj.poster_image.url}"
        return None

class PackageSchema(Schema):
    id: int
    name: str
    price: int
    original_price: int
    slots_left: int

class LeadIn(Schema):
    phone_number: str
    package_id: int
    utr_number: str

class PaymentSettingSchema(Schema):
    upi_id: str
    payee_name: str

class WinningProofSchema(Schema):
    id: int
    title: str
    youtube_url: str
    winning_amount: str

class RecentWinnerSchema(Schema):
    id: int
    name: str
    rank: int
    amount_won: str
    match_name: str
    
    # FIX: Yahan bhi Optional lagana hai
    profile_pic_url: Optional[str] = None 
    
    @staticmethod
    def resolve_profile_pic_url(obj, context):
        if obj.profile_pic:
            request = context['request']
            return request.build_absolute_uri(obj.profile_pic.url)
        return None
    
class SiteSettingSchema(Schema):
    telegram_link: str
    whatsapp_number: str
    daily_booking_count: int

# ==========================================
# 2. ENDPOINTS (React requests ke liye URLs)
# ==========================================

@api.get("/active-match", response=MatchSchema)
def get_active_match(request):
    return Match.objects.filter(is_active=True).order_by('match_time').first()

@api.get("/packages", response=List[PackageSchema])
def get_packages(request):
    return Package.objects.filter(is_active=True)

@api.post("/save-lead")
def save_lead(request, payload: LeadIn):
    package = get_object_or_404(Package, id=payload.package_id)
    lead = Lead.objects.create(
        phone_number=payload.phone_number,
        package=package,
        utr_number=payload.utr_number
    )
    return {"success": True, "message": "Lead saved successfully!", "lead_id": lead.id}

@api.get("/payment-settings", response=PaymentSettingSchema)
def get_payment_settings(request):
    setting = PaymentSetting.objects.filter(is_active=True).first()
    if not setting:
        return {"upi_id": "default@upi", "payee_name": "RankFormula Default"}
    return setting

@api.get("/proofs", response=List[WinningProofSchema])
def get_proofs(request):
    return WinningProof.objects.filter(is_active=True).order_by('-created_at')

@api.get("/recent-winners", response=List[RecentWinnerSchema])
def get_recent_winners(request):
    return RecentWinner.objects.filter(is_active=True).order_by('-created_at')[:10]

@api.get("/site-settings", response=SiteSettingSchema)
def get_site_settings(request):
    setting = SiteSetting.objects.filter(is_active=True).first()
    if not setting:
        # YAHAN THI GALTI: Humne daily_booking_count nahi diya tha default mein
        return {
            "telegram_link": "http://t.me/rankformula1", 
            "whatsapp_number": "9461717755",
            "daily_booking_count": 1  # NAYA FIX
        }
    return setting
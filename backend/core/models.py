from django.db import models

class Match(models.Model):
    # 1. Teams ka Dropdown (Choices)
    TEAM_CHOICES = [
        ('CSK', 'Chennai Super Kings (CSK)'),
        ('DC', 'Delhi Capitals (DC)'),
        ('GT', 'Gujarat Titans (GT)'),
        ('KKR', 'Kolkata Knight Riders (KKR)'),
        ('LSG', 'Lucknow Super Giants (LSG)'),
        ('MI', 'Mumbai Indians (MI)'),
        ('PBKS', 'Punjab Kings (PBKS)'),
        ('RR', 'Rajasthan Royals (RR)'),
        ('RCB', 'Royal Challengers Bengaluru (RCB)'),
        ('SRH', 'Sunrisers Hyderabad (SRH)'),
    ]

    # 2. Themes (Colors) ka Dropdown
    COLOR_CHOICES = [
        ('blue', 'Blue Theme (MI, DC)'),
        ('yellow', 'Yellow Theme (CSK)'),
        ('red', 'Red Theme (RCB, PBKS)'),
        ('emerald', 'Emerald Theme (GT)'),
        ('purple', 'Purple Theme (KKR)'),
        ('orange', 'Orange Theme (SRH)'),
        ('pink', 'Pink Theme (RR)'),
        ('green', 'Green Theme (LSG)'),
    ]

    title = models.CharField(max_length=200, default="TATA IPL 2026 - MEGA MATCH")
    
    # Team 1 Details
    team_1_name = models.CharField(max_length=5, choices=TEAM_CHOICES, verbose_name="Team 1")
    team_1_full_name = models.CharField(max_length=100, default="Chennai Super Kings", help_text="Card mein dikhane ke liye pura naam") # NAYA
    team_1_color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='blue', verbose_name="Team 1 Theme")
    
    # Team 2 Details
    team_2_name = models.CharField(max_length=5, choices=TEAM_CHOICES, verbose_name="Team 2")
    team_2_full_name = models.CharField(max_length=100, default="Mumbai Indians", help_text="Card mein dikhane ke liye pura naam") # NAYA
    team_2_color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='red', verbose_name="Team 2 Theme")
    
    # Match Details
    match_time = models.DateTimeField(help_text="Match start hone ka time select karein (Timer yahan tak chalega)")
    location = models.CharField(max_length=255, help_text="For ex. Narendra Modi Stadium, Ahmedabad")
    
    # NAYA: Background aur Poster Images ke URLs
    bg_image = models.ImageField(upload_to='match_bgs/', blank=True, null=True, help_text="Live Match div ka Background Image upload karein")
    poster_image = models.ImageField(upload_to='match_posters/', blank=True, null=True, help_text="Badges ke neeche dikhne wala Match Poster upload karein")
    
    # Active Toggle
    is_active = models.BooleanField(default=True, help_text="Agar True hai toh yeh match website par live dikhega")

    def __str__(self):
        return f"{self.team_1_name} vs {self.team_2_name} | {self.match_time.strftime('%d %b, %H:%M')}"

    class Meta:
        verbose_name_plural = "Matches"


class Package(models.Model):
    name = models.CharField(max_length=100, default="Rank #1 Guaranteed")
    price = models.IntegerField(help_text="Current Price (e.g. 1999)")
    original_price = models.IntegerField(help_text="Kati hui price (e.g. 4999)")
    slots_left = models.IntegerField(default=1, help_text="Kitne slots bache hain (FOMO ke liye)")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} - ₹{self.price}"


class Lead(models.Model):
    phone_number = models.CharField(max_length=15, verbose_name="WhatsApp Number")
    package = models.ForeignKey(Package, on_delete=models.SET_NULL, null=True, blank=True)
    utr_number = models.CharField(max_length=20, null=True, blank=True, verbose_name="UTR Number")
    created_at = models.DateTimeField(auto_now_add=True)
    is_converted = models.BooleanField(default=False, help_text="Kya is bande ne payment kar di hai?")

    def __str__(self):
        return f"{self.phone_number} - {self.created_at.strftime('%d %b')}"
    
class PaymentSetting(models.Model):
    upi_id = models.CharField(max_length=100, default="hanumntpunb@axl", help_text="Apni active UPI ID daalein")
    payee_name = models.CharField(max_length=100, default="Hanumant Meena", help_text="Bank account mein jo naam hai")
    is_active = models.BooleanField(default=True, help_text="Isko tick rakhein taaki yeh live dikhe")

    def __str__(self):
        return f"Active UPI: {self.upi_id}"
        
    class Meta:
        verbose_name_plural = "Payment Settings"

# ==========================================
# NAYA MODEL: PURI WEBSITE KI SETTINGS KE LIYE
# ==========================================
class SiteSetting(models.Model):
    telegram_link = models.URLField(default="https://t.me/yourchannel", help_text="Apne Telegram Channel/Group ka link daalein")
    whatsapp_number = models.CharField(max_length=15, default="9461717755", help_text="WhatsApp Number daalein (Bina +91 ke)")
    daily_booking_count = models.IntegerField(default=0, help_text="Kitne logo ne book kiya hai? (Fake booking alert ke liye)")
    is_active = models.BooleanField(default=True, help_text="Isko tick rakhein taaki website par update ho jaye")

    def __str__(self):
        return f"Website Links & Numbers (WA: {self.whatsapp_number})"
        
    class Meta:
        verbose_name_plural = "Site Settings (Links/WhatsApp)"

        
class WinningProof(models.Model):
    title = models.CharField(max_length=200, help_text="Example: GL Rank #1 MI vs GT")
    youtube_url = models.URLField(help_text="Paste direct YouTube video link here")
    winning_amount = models.CharField(max_length=50, default="₹1 Crore", help_text="Example: ₹57 Lakh") 
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.winning_amount}"
        
    class Meta:
        verbose_name_plural = "Winning Proofs"
        ordering = ['-created_at']
        
class RecentWinner(models.Model):
    name = models.CharField(max_length=100)
    rank = models.IntegerField(help_text="Example: 1")
    amount_won = models.CharField(max_length=50, help_text="Example: ₹1 Crore")
    match_name = models.CharField(max_length=200, help_text="Example: IND vs AUS GL")
    
    # NAYA FIELD: Profile Picture (Server par store hogi)
    # winners/ folder mein images save hongi media root ke andar
    profile_pic = models.ImageField(upload_to='winners/', blank=True, null=True, help_text="Winner ki photo upload karein (Square shape best rhegi)")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - Rank {self.rank}"
        
    class Meta:
        verbose_name_plural = "Recent Winners"
        ordering = ['-created_at'] # Naye winners upar dikhenge
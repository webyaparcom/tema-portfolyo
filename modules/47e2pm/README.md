# tema-portfolyo · 47e2pm — Müşteri Yorumları 1

## Nedir

tema-portfolyo sitesinin matrix modülü. `Müşteri Yorumları 1` şablonu (section kökü,
sınıf `modulex-testi`) render sırasında sitenin sayfa akışına eklenir. Şablon içeriği
`index.html`'deki `{{...}}` soketleriyle, veri/tema değerleri `index.json`'la
beslenir.

## Dosyalar

| Dosya | Rol |
|-------|-----|
| `back.js` | Modül davranışı (vanilla JS) (1 KB) |
| `index.html` | Modül şablonu (render hedefi) (3 KB) |
| `index.jpeg` | Önizleme görseli (38 KB) |
| `index.json` | Veri + tema token'ları (2 KB) |

## Girdiler
| Değişken | Örnek değer |
|--------|-------------|
| `max` | `1200px` |
| `bgcolor` | `#f8fafc` |
| `cardbg` | `#ffffff` |
| `bordercolor` | `#e2e8f0` |
| `titlecolor` | `#1e293b` |
| `textcolor` | `#475569` |
| `accent` | `#DE6D26` |
| `starcolor` | `#f59e0b` |

- `name`: `Müşteri Yorumları 1`
- `data`: 3 kayıt. Örnek: `{"name": "Ad Soyad", "role": {"tr": "Firma Sahibi", "en": "Business Owner"}, "text": {"tr": "Süreç boyunca hızlı ve profesyonel bir hizmet …`
- Diğer anahtarlar: `category`, `description`, `version`, `icon`

## Temaya bağımlılık
Tema token'ları `index.json -> desing` üzerinden gelir (önceki tablo): **max**, **bgcolor**, **cardbg**, **bordercolor**, **titlecolor**.

## Test

Webmaker render hattında site sayfası üretilir; çıktı HTML'de bu modülün kök bloğu
(`modulex-testi`) yerleşik görünmelidir. Render ucu: mcp/webmaker
render aracı / proje site dizini çıktısı.

## Kullanım örneği

Modül tema-portfolyo sitesinde `web/matrix/modules/47e2pm/` yolunda tanımlıdır; sayfa
yapılandırması bu yolu referans alır. Veri örneği (`index.json`):
```
{
  "name": "Müşteri Yorumları 1",
  "desing": {
    "max": "1200px",
    "bgcolor": "#f8fafc",
    "cardbg": "#ffffff",
    "bordercolor": "#e2e8f0",
    "titlecolor": "#1e293b",
    "textcolor": "#475569",
    "accent": "#DE6D26",
    "starcolor": "#f59e0b",
    "badge": {
      "tr": "Yorumlar",
      "en": "Testimonials"
    },
    "title": {
      "tr": "Müşterilerimiz Ne Diyor?",
      "en": "What Our Customers Say"
    },
    "description": {
      "tr": "Birlikte çalıştığımız müşterilerimizin deneyimleri.",
      "en": "Experiences from the customers we work with."
    }
  },
  "data": [
    {
      "name": "Ad Soyad",
      "role": {
        "tr": "Firma Sahibi",
        "en": "Busi
```

## Notlar

- Oluşturuldu: 2026-11-01 — modül envanterinde otomatik tamamlanan README (kaynak dosyalar: index.json, index.html).
- İçerik bu klasördeki gerçek dosyalardan okunarak yazıldı; modül değişikliğinde elden güncellenmelidir.

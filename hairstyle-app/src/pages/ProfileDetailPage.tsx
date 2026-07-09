import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import HairstylistCard from '../components/HairstylistCard'
import hairstylists from '../data/hairstylists.json'
import { hairstyles, services } from '../data/catalog'
import { toggleId, useDemoFavorites, useDemoProfile, useNotificationPreferences } from '../lib/demoStore'

type SectionConfig = {
  title: string
  icon: string
  intro: string
  primaryLabel: string
  rows: Array<{ label: string; value: string; tone?: 'gold' | 'green' | 'red' }>
}

const SECTIONS: Record<string, SectionConfig> = {
  payments: { title: 'Paiement & cartes', icon: 'CARD', intro: 'Gérez vos moyens de paiement pour les acomptes.', primaryLabel: 'Ajouter une carte', rows: [{ label: 'Carte principale', value: 'Visa 4242', tone: 'gold' }, { label: 'Acompte par défaut', value: '25% du service' }, { label: 'Remboursement', value: "Jusqu'à 48h avant le rendez-vous", tone: 'green' }] },
  addresses: { title: 'Mes adresses', icon: 'PIN', intro: 'Vos adresses préférées pour réserver plus vite.', primaryLabel: 'Ajouter une adresse', rows: [{ label: 'Domicile', value: '12 Rue de la Roquette, Paris 11e', tone: 'gold' }, { label: 'Travail', value: '8 Avenue Emile Zola, Paris 15e' }, { label: 'Chez maman', value: '24 Rue Oberkampf, Paris 11e' }] },
  loyalty: { title: 'Programme fidélité', icon: 'STAR', intro: 'Suivez vos points et les avantages débloqués.', primaryLabel: 'Voir mes avantages', rows: [{ label: 'Statut actuel', value: 'Gold', tone: 'gold' }, { label: 'Points disponibles', value: '340 pts' }, { label: 'Prochain palier', value: 'Platinum à 500 pts' }] },
  referral: { title: 'Parrainage', icon: 'GIFT', intro: 'Invitez vos proches et gagnez 10 euros de réduction par première réservation validée.', primaryLabel: 'Copier mon code', rows: [{ label: 'Code personnel', value: 'SOPHIA2026', tone: 'gold' }, { label: 'Récompense', value: '10 euros par amie invitée', tone: 'green' }, { label: 'Invitations envoyées', value: '3' }] },
  'promo-codes': { title: 'Mes codes promo', icon: 'TAG', intro: 'Retrouvez vos offres actives et les conditions d utilisation.', primaryLabel: 'Utiliser WELCOME10', rows: [{ label: 'WELCOME10', value: '-10 euros sur le prochain acompte', tone: 'gold' }, { label: 'Expire le', value: '31 aout 2026' }, { label: 'Minimum', value: 'Service a partir de 60 euros' }] },
  'notification-settings': { title: 'Notifications', icon: 'BELL', intro: 'Choisissez les alertes utiles pour vos reservations et offres.', primaryLabel: 'Enregistrer mes préférences', rows: [{ label: 'Rappels rendez-vous', value: 'Actives', tone: 'green' }, { label: 'Offres Hairly', value: 'Actives', tone: 'green' }, { label: 'SMS de confirmation', value: 'Actives', tone: 'green' }] },
  settings: { title: 'Paramètres', icon: 'SET', intro: 'Confidentialité, sécurité et préférences generales du compte.', primaryLabel: 'Mettre a jour', rows: [{ label: 'Confidentialité', value: 'Profil visible uniquement par les pros reserves' }, { label: 'Securite', value: 'Connexion protégée' }, { label: 'Langue', value: 'Français' }] },
  support: { title: 'Aide & support', icon: 'HELP', intro: 'Trouvez une réponse ou contactez l\'équipe Hairly.', primaryLabel: 'Contacter le support', rows: [{ label: 'FAQ réservation', value: 'Modifier, annuler ou déplacer un rendez-vous' }, { label: 'Paiement', value: 'Acompte, remboursement et facture' }, { label: 'Contact', value: 'support@hairly.demo' }] },
}

const toneColors = {
  gold: { color: 'var(--gold)', background: 'var(--gold-light)', border: 'var(--gold-border)' },
  green: { color: '#15803D', background: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.25)' },
  red: { color: '#DC2626', background: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' },
}

export default function ProfileDetailPage() {
  const { section } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState('')
  const [favorites, setFavorites] = useDemoFavorites()
  const [profile] = useDemoProfile()
  const [toggles, setToggles] = useNotificationPreferences()

  const config = section ? SECTIONS[section] : undefined
  const savedStylists = useMemo(() => hairstylists.filter(stylist => favorites.hairstylistIds.includes(stylist.id)), [favorites.hairstylistIds])
  const savedServices = useMemo(() => services.filter(service => favorites.serviceIds.includes(service.id)), [favorites.serviceIds])
  const savedStyles = useMemo(() => hairstyles.filter(style => favorites.hairstyleIds.includes(style.id)), [favorites.hairstyleIds])
  const detailRows = useMemo(() => {
    if (!config) return []
    return config.rows.map(row => {
      if (section === 'loyalty' && row.label === 'Statut actuel') return { ...row, value: profile.tier }
      if (section === 'loyalty' && row.label === 'Points disponibles') return { ...row, value: `${profile.loyaltyPoints} pts` }
      if (section === 'referral' && row.label === 'Code personnel') return { ...row, value: profile.referralCode }
      return row
    })
  }, [config, profile.loyaltyPoints, profile.referralCode, profile.tier, section])

  const showFeedback = (message: string) => {
    setFeedback(message)
    window.setTimeout(() => setFeedback(''), 1800)
  }

  if (section === 'favorites') {
    const totalFavorites = savedStylists.length + savedServices.length + savedStyles.length
    return (
      <div className="pb-10" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
        <Header title="Favorites" showBack />
        <div className="px-4 pt-4">
          <div className="p-4 rounded-2xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontSize: 26, marginBottom: 8 }}>LOVE</p>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins' }}>Mes favoris</h1>
            <p style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Poppins', marginTop: 6 }}>{totalFavorites} element{totalFavorites > 1 ? 's' : ''} sauvegarde{totalFavorites > 1 ? 's' : ''} pour reserver plus vite.</p>
          </div>
          {totalFavorites === 0 && <div className="flex flex-col items-center py-14 gap-3"><div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)', fontSize: 26 }}>♡</div><p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Poppins' }}>Aucun favori pour le moment</p><p style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Poppins', textAlign: 'center', maxWidth: 240 }}>Ajoutez une coiffeuse, un service ou un style pour le retrouver ici.</p><button onClick={() => navigate('/hairstyles')} className="px-4 py-3 rounded-xl active-scale" style={{ background: 'var(--gold)', color: '#FFFFFF', fontSize: 13, fontWeight: 700, fontFamily: 'Poppins' }}>Explorer les styles</button></div>}
          {savedStylists.length > 0 && <div className="mb-5"><p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, paddingLeft: 4 }}>Coiffeuses</p>{savedStylists.map(stylist => <div key={stylist.id} className="mb-3"><HairstylistCard stylist={stylist} /><button type="button" onClick={() => setFavorites(current => ({ ...current, hairstylistIds: toggleId(current.hairstylistIds, stylist.id) }))} className="w-full -mt-1 py-2 rounded-xl active-scale" style={{ background: 'rgba(239,68,68,0.07)', color: '#DC2626', border: '1px solid rgba(239,68,68,0.18)', fontSize: 12, fontWeight: 600, fontFamily: 'Poppins' }}>Retirer des favoris</button></div>)}</div>}
          {savedServices.length > 0 && <div className="mb-5"><p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, paddingLeft: 4 }}>Services</p><div className="flex flex-col gap-3">{savedServices.map(service => { const stylist = hairstylists.find(item => item.services.includes(service.id)); return <div key={service.id} className="flex items-center gap-3 p-3.5 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}><img src={service.image} alt={service.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" /><div className="flex-1 min-w-0"><p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{service.name}</p><p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Poppins' }}>{service.duration} · {service.price}€</p></div><button onClick={() => navigate(stylist ? `/booking?serviceId=${service.id}&stylistId=${stylist.id}` : '/hairstylists')} className="px-3 py-2 rounded-xl active-scale" style={{ background: 'var(--cta-gradient)', color: '#FFFFFF', fontSize: 12, fontWeight: 700, fontFamily: 'Poppins' }}>Reserver</button></div> })}</div></div>}
          {savedStyles.length > 0 && <div className="mb-5"><p style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-3)', fontFamily: 'Poppins', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, paddingLeft: 4 }}>Styles</p><div className="grid grid-cols-2 gap-3">{savedStyles.map(style => <div key={style.id} className="rounded-2xl overflow-hidden" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}><button type="button" onClick={() => navigate(`/hairstylists?category=${style.category}`)} className="w-full text-left active-scale"><div style={{ height: 128 }}><img src={style.image} alt={style.name} className="w-full h-full object-cover" /></div><div className="p-2.5"><p className="truncate" style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{style.name}</p><p style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Poppins' }}>des {style.startingPrice}€</p></div></button><button type="button" onClick={() => setFavorites(current => ({ ...current, hairstyleIds: toggleId(current.hairstyleIds, style.id) }))} className="w-full py-2 active-scale" style={{ background: 'rgba(239,68,68,0.07)', color: '#DC2626', borderTop: '1px solid rgba(239,68,68,0.18)', fontSize: 11, fontWeight: 600, fontFamily: 'Poppins' }}>Retirer</button></div>)}</div></div>}
        </div>
      </div>
    )
  }

  if (!config) return <div className="pb-10" style={{ background: 'var(--bg)', minHeight: '100svh' }}><Header title="Profil" showBack /><div className="px-4 pt-12 flex flex-col items-center gap-3"><p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Poppins' }}>Section introuvable</p><button onClick={() => navigate('/profile')} className="px-4 py-3 rounded-xl active-scale" style={{ background: 'var(--gold)', color: '#FFFFFF', fontSize: 13, fontWeight: 700, fontFamily: 'Poppins' }}>Retour au profil</button></div></div>

  return (
    <div className="pb-10" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Header title={config.title} showBack />
      <div className="px-4 pt-4">
        <div className="p-5 rounded-2xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}><div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)', fontSize: 12, color: 'var(--gold)', fontWeight: 800 }}>{config.icon}</div><h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins', lineHeight: 1.2 }}>{config.title}</h1><p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-2)', fontFamily: 'Poppins', marginTop: 8 }}>{config.intro}</p></div>
        {section === 'notification-settings' && <div className="flex flex-col gap-3 mb-4">{[{ key: 'reminders', label: 'Rappels rendez-vous' }, { key: 'offers', label: 'Offres et nouveautés' }, { key: 'sms', label: 'SMS de confirmation' }].map(item => { const key = item.key as keyof typeof toggles; return <button key={item.key} onClick={() => setToggles(current => ({ ...current, [key]: !current[key] }))} className="w-full flex items-center justify-between p-4 rounded-2xl active-scale" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}><span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{item.label}</span><span className="w-11 h-6 rounded-full flex items-center p-0.5" style={{ background: toggles[key] ? 'var(--gold)' : 'var(--surface-2)', transition: 'background 0.18s ease' }}><span className="w-5 h-5 rounded-full" style={{ background: '#fff', transform: toggles[key] ? 'translateX(20px)' : 'translateX(0)', transition: 'transform 0.18s ease' }} /></span></button> })}</div>}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>{detailRows.map((row, index) => { const tone = row.tone ? toneColors[row.tone] : undefined; return <div key={row.label} className="flex items-center justify-between gap-3 p-4" style={{ background: '#fff', borderBottom: index < detailRows.length - 1 ? '1px solid var(--border)' : 'none' }}><div><p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Poppins', marginBottom: 2 }}>{row.label}</p><p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{row.value}</p></div>{tone && <span style={{ color: tone.color, background: tone.background, border: `1px solid ${tone.border}`, borderRadius: 99, padding: '3px 9px', fontSize: 10, fontWeight: 700, fontFamily: 'Poppins' }}>Actif</span>}</div> })}</div>
        {feedback && <div className="mb-3 p-3 rounded-xl" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)', color: 'var(--gold)', fontSize: 12, fontWeight: 700, fontFamily: 'Poppins' }}>{feedback}</div>}
        <button onClick={() => showFeedback(section === 'referral' ? `Code ${profile.referralCode} copié.` : 'Action enregistrée pour la démo.')} className="w-full py-4 rounded-2xl active-scale" style={{ background: 'var(--cta-gradient)', color: '#FFFFFF', fontSize: 14, fontWeight: 700, fontFamily: 'Poppins', boxShadow: '0 4px 16px rgba(196,69,115,0.28)' }}>{config.primaryLabel}</button>
      </div>
    </div>
  )
}

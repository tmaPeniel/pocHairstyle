import { useState, type ReactNode } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const DAY_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const MONTH_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

function genRef() {
  return 'HLY-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}
const BOOKING_REF = genRef()

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="w-9 h-9 flex items-center justify-center rounded-2xl" style={{ background: 'var(--surface-2)' }}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope', marginBottom: 1 }}>{label}</p>
        <p className="truncate" style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{value}</p>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isPaying, setIsPaying] = useState(false)

  const serviceId = searchParams.get('serviceId')
  const stylistId = searchParams.get('stylistId')
  const dateStr = searchParams.get('date')
  const time = searchParams.get('time')
  const address = searchParams.get('address') ?? ''
  const notes = searchParams.get('notes') ?? ''

  const service = services.find(item => item.id === serviceId)
  const stylist = hairstylists.find(item => item.id === stylistId)
  const date = dateStr ? new Date(dateStr) : null
  const deposit = service ? Math.round(service.price * 0.25) : 0
  const remaining = (service?.price ?? 0) - deposit

  const formatDate = (value: Date) => `${DAY_FR[value.getDay()]} ${value.getDate()} ${MONTH_FR[value.getMonth()]}`

  const handlePay = () => {
    setIsPaying(true)
    const params = new URLSearchParams({ serviceId: serviceId ?? '', stylistId: stylistId ?? '', date: dateStr ?? '', time: time ?? '', address, notes, ref: BOOKING_REF })
    window.setTimeout(() => navigate(`/success?${params}`), 900)
  }

  return (
    <div className="pb-28" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Header title="Confirmation" showBack />

      <div className="px-4 pt-4">
        <div className="p-4 rounded-3xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope', marginBottom: 2 }}>Référence</p>
              <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope', letterSpacing: 0.5 }}>{BOOKING_REF}</p>
            </div>
            <span className="px-3 py-1 rounded-full" style={{ background: 'var(--primary-light)', color: 'var(--gold)', fontSize: 11, fontWeight: 800, fontFamily: 'Manrope' }}>À valider</span>
          </div>

          {service && (
            <div className="flex items-center gap-3 pb-4 mb-1" style={{ borderBottom: '1px solid var(--border)' }}>
              <img src={service.image} alt={service.name} className="w-14 h-14 rounded-2xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="truncate" style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{service.name}</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{service.duration}</p>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{service.price}€</span>
            </div>
          )}

          <DetailRow icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>} label="Coiffeuse" value={stylist?.name ?? '-'} />
          {date && <DetailRow icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>} label="Date" value={formatDate(date)} />}
          <DetailRow icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} label="Heure" value={time ?? '-'} />
          {address && <DetailRow icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>} label="Adresse" value={address} />}
          {notes && <div className="pt-3"><p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope', marginBottom: 3 }}>Notes</p><p style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Manrope' }}>{notes}</p></div>}
        </div>

        <div className="p-4 rounded-3xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex justify-between mb-2"><span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Manrope' }}>Service</span><span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope' }}>{service?.price ?? 0}€</span></div>
          <div className="flex justify-between mb-3 pb-3" style={{ borderBottom: '1px solid var(--border)' }}><span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Manrope' }}>Déplacement</span><span style={{ fontSize: 13, fontWeight: 800, color: '#15803D', fontFamily: 'Manrope' }}>Gratuit</span></div>
          <div className="flex justify-between items-end">
            <div>
              <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope' }}>Acompte</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Manrope' }}>{deposit}€</p>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{remaining}€ le jour J</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 z-40" style={{ background: 'rgba(255,255,255,0.94)', backdropFilter: 'blur(14px)', borderTop: '1px solid var(--border)', paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}>
        <button onClick={handlePay} disabled={isPaying} className="w-full py-4 rounded-2xl active-scale" style={{ background: isPaying ? 'var(--surface-2)' : 'var(--cta-gradient)', color: isPaying ? 'var(--text-3)' : '#FFFFFF', fontSize: 15, fontWeight: 800, fontFamily: 'Manrope', border: 'none' }}>
          {isPaying ? 'Validation...' : `Payer ${deposit}€`}
        </button>
        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope', textAlign: 'center', marginTop: 6 }}>Sécurisé · Annulable 48h avant</p>
      </div>
    </div>
  )
}

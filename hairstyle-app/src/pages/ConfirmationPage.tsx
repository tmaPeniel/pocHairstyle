import { useState, type ReactNode } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'

const DAY_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
const MONTH_FR = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']

function genRef() {
  return 'HLY-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

const BOOKING_REF = genRef()

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5" style={{ borderBottom: '1px solid var(--border)' }}>
      <div className="w-8 h-8 flex items-center justify-center rounded-xl" style={{ background: 'var(--gold-light)' }}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 1 }}>{label}</p>
        <p className="truncate" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Inter' }}>{value}</p>
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

  const formatDate = (value: Date) => DAY_FR[value.getDay()] + ' ' + value.getDate() + ' ' + MONTH_FR[value.getMonth()]

  const handlePay = () => {
    setIsPaying(true)
    const params = new URLSearchParams({ serviceId: serviceId ?? '', stylistId: stylistId ?? '', date: dateStr ?? '', time: time ?? '', address, notes, ref: BOOKING_REF })
    window.setTimeout(() => navigate('/success?' + params.toString()), 1200)
  }

  return (
    <div className="pb-28" style={{ background: 'var(--bg)' }}>
      <Header title="Confirmer" showBack />

      <div className="px-4 pt-4">
        <div className="flex items-center justify-between p-3.5 rounded-2xl mb-4" style={{ background: 'var(--gold-light)', border: '1px solid var(--gold-border)' }}>
          <div>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', textTransform: 'uppercase', fontWeight: 800 }}>Ref</p>
            <p style={{ fontSize: 18, fontWeight: 900, color: 'var(--gold)', fontFamily: 'Inter', letterSpacing: 1 }}>{BOOKING_REF}</p>
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color: '#15803D', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 99, padding: '5px 10px', fontFamily: 'Inter' }}>Prêt</span>
        </div>

        <div className="p-4 rounded-2xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          {service && (
            <div className="flex items-center gap-3 pb-3 mb-1" style={{ borderBottom: '1px solid var(--border)' }}>
              <img src={service.image} alt={service.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>{service.name}</p>
                <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{service.duration}</p>
              </div>
              <span style={{ fontSize: 15, fontWeight: 900, color: 'var(--gold)', fontFamily: 'Inter' }}>{service.price}?</span>
            </div>
          )}

          <DetailRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><circle cx="12" cy="7" r="4" /><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /></svg>} label="Pro" value={stylist?.name ?? '-'} />
          {date && <DetailRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>} label="Date" value={formatDate(date)} />}
          <DetailRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>} label="Heure" value={time ?? '-'} />
          {address && <DetailRow icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>} label="Adresse" value={address} />}
        </div>

        <div className="p-4 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <div className="flex justify-between mb-2"><span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>Total</span><span style={{ fontSize: 14, fontWeight: 900, color: 'var(--text-1)', fontFamily: 'Inter' }}>{service?.price}?</span></div>
          <div className="flex justify-between mb-2"><span style={{ fontSize: 13, color: 'var(--text-2)', fontFamily: 'Inter' }}>Acompte</span><span style={{ fontSize: 18, fontWeight: 900, color: 'var(--gold)', fontFamily: 'Inter' }}>{deposit}?</span></div>
          <div className="flex justify-between"><span style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Inter' }}>Jour J</span><span style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-2)', fontFamily: 'Inter' }}>{remaining}?</span></div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 py-3 z-40" style={{ background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--border)', paddingBottom: 'env(safe-area-inset-bottom, 12px)' }}>
        <button onClick={handlePay} disabled={isPaying} className="w-full py-4 rounded-2xl active-scale flex items-center justify-center gap-2" style={{ background: isPaying ? 'var(--surface)' : 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)', color: isPaying ? 'var(--text-3)' : '#1A1A1A', fontSize: 15, fontWeight: 800, fontFamily: 'Inter', border: isPaying ? '1.5px solid var(--border)' : 'none', boxShadow: isPaying ? 'none' : '0 4px 20px rgba(201,168,76,0.4)' }}>
          {isPaying ? 'Paiement...' : 'Payer ' + deposit + '?'}
        </button>
        <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', textAlign: 'center', marginTop: 6 }}>Paiement sécurisé</p>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import services from '../data/services.json'
import hairstylists from '../data/hairstylists.json'
import { useDemoBookings } from '../lib/demoStore'

const MONTH = ['jan', 'fev', 'mar', 'avr', 'mai', 'juin', 'juil', 'aout', 'sep', 'oct', 'nov', 'dec']

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [fallbackRef] = useState(() => 'HLY-DEMO')
  const [, setBookings] = useDemoBookings()

  const serviceId = searchParams.get('serviceId')
  const stylistId = searchParams.get('stylistId')
  const dateStr = searchParams.get('date')
  const time = searchParams.get('time')
  const ref = searchParams.get('ref') ?? fallbackRef
  const address = searchParams.get('address') ?? ''
  const notes = searchParams.get('notes') ?? ''

  const service = services.find(item => item.id === serviceId)
  const stylist = hairstylists.find(item => item.id === stylistId)
  const date = dateStr ? new Date(dateStr) : null
  const deposit = service ? Math.round(service.price * 0.25) : 0

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 80)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!service || !stylist || !dateStr || !time) return

    setBookings(current => {
      const id = 'demo-' + ref
      if (current.some(booking => booking.id === id || booking.ref === ref)) return current

      return [{ id, ref, stylistId: stylist.id, stylistName: stylist.name, serviceId: service.id, serviceName: service.name, date: dateStr, time, price: service.price, deposit, status: 'confirmed', address: address || 'Adresse a confirmer', notes, createdAt: new Date().toISOString() }, ...current]
    })
  }, [address, dateStr, deposit, notes, ref, service, setBookings, stylist, time])

  const fadeUp = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(18px)',
    transition: 'opacity 0.45s ease ' + delay + 'ms, transform 0.45s ease ' + delay + 'ms',
  })

  return (
    <div className="min-h-screen flex flex-col px-4 pb-10 pt-14" style={{ background: 'var(--bg)' }}>
      <div className="flex justify-center mb-5" style={fadeUp(0)}>
        <div className="rounded-full flex items-center justify-center" style={{ width: 88, height: 88, background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)', boxShadow: '0 8px 32px rgba(201,168,76,0.4)' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
      </div>

      <div className="text-center mb-5" style={fadeUp(100)}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: 'var(--text-1)', fontFamily: 'Inter', marginBottom: 8 }}>Confirmé</h1>
        <span style={{ fontSize: 12, fontWeight: 900, color: 'var(--gold)', background: 'var(--gold-light)', border: '1px solid var(--gold-border)', borderRadius: 99, padding: '6px 12px', fontFamily: 'Inter', letterSpacing: 1 }}>{ref}</span>
      </div>

      <div className="w-full p-4 rounded-2xl mb-5" style={{ background: 'var(--surface)', border: '1.5px solid var(--gold-border)', boxShadow: '0 4px 20px rgba(201,168,76,0.12)', ...fadeUp(180) }}>
        {service && (
          <div className="flex items-center gap-3 pb-3 mb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <img src={service.image} alt={service.name} className="w-14 h-14 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="truncate" style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>{service.name}</p>
              <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Inter' }}>{stylist?.name}</p>
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#15803D', background: 'rgba(34,197,94,0.1)', borderRadius: 99, padding: '5px 9px', fontFamily: 'Inter' }}>Actif</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 2 }}>Date</p><p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>{date ? date.getDate() + ' ' + MONTH[date.getMonth()] : '-'}</p></div>
          <div className="p-3 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 2 }}>Heure</p><p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Inter' }}>{time}</p></div>
          <div className="p-3 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 2 }}>Acompte</p><p style={{ fontSize: 14, fontWeight: 900, color: 'var(--gold)', fontFamily: 'Inter' }}>{deposit}?</p></div>
          <div className="p-3 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)' }}><p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Inter', marginBottom: 2 }}>Solde</p><p style={{ fontSize: 14, fontWeight: 900, color: 'var(--text-1)', fontFamily: 'Inter' }}>{(service?.price ?? 0) - deposit}?</p></div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 mt-auto" style={fadeUp(260)}>
        <button onClick={() => navigate('/reservations')} className="w-full py-4 rounded-2xl active-scale" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C040 100%)', color: '#1A1A1A', fontSize: 14, fontWeight: 900, fontFamily: 'Inter', boxShadow: '0 4px 16px rgba(201,168,76,0.35)' }}>Mes rendez-vous</button>
        <button onClick={() => navigate('/')} className="w-full py-3.5 rounded-2xl active-scale" style={{ background: 'var(--surface)', color: 'var(--text-2)', fontSize: 14, fontWeight: 700, fontFamily: 'Inter', border: '1px solid var(--border)' }}>Accueil</button>
      </div>
    </div>
  )
}

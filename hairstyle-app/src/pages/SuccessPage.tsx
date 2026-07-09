import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { services } from '../data/catalog'
import hairstylists from '../data/hairstylists.json'
import { useDemoBookings } from '../lib/demoStore'

const MONTH = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc']

export default function SuccessPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
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
  const remaining = (service?.price ?? 0) - deposit

  useEffect(() => {
    if (!service || !stylist || !dateStr || !time) return

    setBookings(current => {
      const id = `demo-${ref}`
      if (current.some(booking => booking.id === id || booking.ref === ref)) return current

      return [
        {
          id,
          ref,
          stylistId: stylist.id,
          stylistName: stylist.name,
          serviceId: service.id,
          serviceName: service.name,
          date: dateStr,
          time,
          price: service.price,
          deposit,
          status: 'confirmed',
          address: address || 'Adresse à confirmer',
          notes,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ]
    })
  }, [address, dateStr, deposit, notes, ref, service, setBookings, stylist, time])

  return (
    <div className="min-h-screen flex flex-col px-4 pb-10 pt-12" style={{ background: 'var(--bg)' }}>
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-border)' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'var(--cta-gradient)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins', marginBottom: 5 }}>Réservation confirmée</h1>
        <p style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Poppins' }}>Ref. {ref}</p>
      </div>

      <div className="w-full p-4 rounded-3xl mb-4" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid var(--border)' }}>
          {service && <img src={service.image} alt={service.name} className="w-14 h-14 rounded-2xl object-cover" />}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full" style={{ background: '#22C55E' }} />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#15803D', fontFamily: 'Poppins' }}>Active</span>
            </div>
            <p className="truncate" style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{service?.name ?? 'Service'}</p>
            <p className="truncate" style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Poppins' }}>{stylist?.name ?? 'Coiffeuse'} · {time}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          <div className="p-3 rounded-2xl" style={{ background: 'var(--surface-2)' }}>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Poppins', marginBottom: 2 }}>Date</p>
            <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{date ? `${date.getDate()} ${MONTH[date.getMonth()]} ${date.getFullYear()}` : '-'}</p>
          </div>
          <div className="p-3 rounded-2xl" style={{ background: 'var(--surface-2)' }}>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Poppins', marginBottom: 2 }}>Total</p>
            <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{service?.price ?? 0}€</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <div>
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Poppins' }}>Acompte payé</p>
            <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--gold)', fontFamily: 'Poppins' }}>{deposit}€</p>
          </div>
          <div className="text-right">
            <p style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Poppins' }}>Jour J</p>
            <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins' }}>{remaining}€</p>
          </div>
        </div>
      </div>

      <div className="w-full p-3.5 rounded-3xl mb-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: 'var(--primary-light)', color: 'var(--gold)', fontSize: 11, fontWeight: 800, fontFamily: 'Poppins' }}>SMS</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Poppins' }}>Confirmation envoyée</p>
            <p style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'Poppins' }}>Prépare tes cheveux lavés et secs.</p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 mt-auto">
        <button onClick={() => navigate('/reservations')} className="w-full py-4 rounded-2xl active-scale" style={{ background: 'var(--cta-gradient)', color: '#FFFFFF', fontSize: 14, fontWeight: 800, fontFamily: 'Poppins' }}>Mes réservations</button>
        <button onClick={() => navigate('/')} className="w-full py-3.5 rounded-2xl active-scale" style={{ background: 'var(--surface)', color: 'var(--text-2)', fontSize: 14, fontWeight: 700, fontFamily: 'Poppins', border: '1px solid var(--border)' }}>Accueil</button>
      </div>
    </div>
  )
}

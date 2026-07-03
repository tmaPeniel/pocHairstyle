import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

type NotificationItem = {
  id: string
  icon: string
  title: string
  body: string
  time: string
  unread: boolean
  actionTo?: string
  actionLabel?: string
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    icon: '📅',
    title: 'Rappel de rendez-vous',
    body: 'Votre rendez-vous Box Braids avec Amara est prévu dans 7 jours.',
    time: 'Il y a 12 min',
    unread: true,
    actionTo: '/reservations',
    actionLabel: 'Voir mes résas',
  },
  {
    id: 'n2',
    icon: '✨',
    title: 'Nouvelle coiffeuse disponible',
    body: 'Nadia propose maintenant des poses de perruques dans votre secteur.',
    time: 'Hier',
    unread: true,
    actionTo: '/hairstylists?category=Perruques',
    actionLabel: 'Découvrir',
  },
  {
    id: 'n3',
    icon: '🎁',
    title: 'Code promo actif',
    body: 'Votre code WELCOME10 est disponible sur votre prochain acompte.',
    time: 'Lundi',
    unread: false,
    actionTo: '/profile/promo-codes',
    actionLabel: 'Voir le code',
  },
]

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS)

  const unreadCount = useMemo(() => items.filter(item => item.unread).length, [items])
  const hasRead = items.some(item => !item.unread)

  const openNotification = (item: NotificationItem) => {
    setItems(current => current.map(n => n.id === item.id ? { ...n, unread: false } : n))
    if (item.actionTo) navigate(item.actionTo)
  }

  return (
    <div className="pb-10" style={{ background: 'var(--bg)', minHeight: '100svh' }}>
      <Header
        title="Notifications"
        showBack
        action={
          unreadCount > 0 ? (
            <button
              onClick={() => setItems(current => current.map(item => ({ ...item, unread: false })))}
              className="px-3 py-2 rounded-xl active-scale"
              style={{
                background: 'var(--gold-light)',
                border: '1px solid var(--gold-border)',
                color: 'var(--gold)',
                fontSize: 11,
                fontWeight: 700,
                fontFamily: 'Manrope',
              }}
            >
              Tout lu
            </button>
          ) : null
        }
      />

      <div className="px-4 pt-4">
        <div
          className="p-4 rounded-2xl mb-4"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
        >
          <p style={{ fontSize: 12, color: 'var(--text-3)', fontFamily: 'Manrope', marginBottom: 4 }}>
            Centre d'activité
          </p>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-1)', fontFamily: 'Manrope', lineHeight: 1.2 }}>
            {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Tout est à jour'}
          </h1>
          <p style={{ fontSize: 12, color: 'var(--text-2)', fontFamily: 'Manrope', marginTop: 6 }}>
            Réservations, offres et nouveautés importantes apparaissent ici.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--surface)' }}>
              <span style={{ fontSize: 28 }}>🔔</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope' }}>
              Aucune notification
            </p>
            <button
              onClick={() => navigate('/profile/notification-settings')}
              className="px-4 py-3 rounded-xl active-scale"
              style={{
                background: 'var(--cta-gradient)',
                color: '#1A1A1A',
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'Manrope',
              }}
            >
              Gérer mes alertes
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => openNotification(item)}
                className="w-full text-left p-4 rounded-2xl active-scale"
                style={{
                  background: item.unread ? 'var(--surface)' : 'rgba(255,255,255,0.68)',
                  border: item.unread ? '1.5px solid var(--gold-border)' : '1px solid var(--border)',
                  boxShadow: item.unread ? '0 4px 20px rgba(196,69,115,0.12)' : 'var(--shadow-sm)',
                  fontFamily: 'Manrope',
                }}
              >
                <div className="flex gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.unread ? 'var(--gold-light)' : 'var(--surface-2)', fontSize: 20 }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', fontFamily: 'Manrope' }}>
                        {item.title}
                      </p>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: 'var(--gold)' }} />
                      )}
                    </div>
                    <p style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-2)', fontFamily: 'Manrope', marginTop: 3 }}>
                      {item.body}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span style={{ fontSize: 10, color: 'var(--text-3)', fontFamily: 'Manrope' }}>{item.time}</span>
                      {item.actionLabel && (
                        <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', fontFamily: 'Manrope' }}>
                          {item.actionLabel} →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {hasRead && (
          <button
            onClick={() => setItems(current => current.filter(item => item.unread))}
            className="w-full mt-4 py-3 rounded-2xl active-scale"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-2)',
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'Manrope',
            }}
          >
            Effacer les notifications lues
          </button>
        )}
      </div>
    </div>
  )
}

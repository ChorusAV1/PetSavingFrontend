import axios from 'axios'
import React, { useEffect, useState, type JSX } from 'react'
import { avatarCache } from '../lib/avatarCache'

interface AvatarProps
{
    guid?: string
    name: string
    size?: number
    className?: string
}

const Avatar: React.FC<AvatarProps> = ({ guid, name, size = 32, className = "", }: AvatarProps): JSX.Element =>
{
    const [src, setSrc] = useState<string | null>(null)
    const [loaded, setLoaded] = useState(false)
    const [failed, setFailed] = useState(false)

    const initials = getInitials(name)
    const bgColor = stringToColor(name)

    useEffect(() =>
    {
        if (!guid) return

        if (avatarCache.has(guid))
        {
            setSrc(avatarCache.get(guid)!);

            return
        }

        let cancelled = false

        axios
            .get(import.meta.env.VITE_API_URL + `/image/sm/${guid}`, {
                responseType: "blob",
            })
            .then((res) => {
                if (cancelled) return

                const url = URL.createObjectURL(res.data)

                avatarCache.set(guid, url)
                setSrc(url)
            })
            .catch((err) => {
                if (err.response?.status === 404)
                {
                    // expected → do nothing special
                    setFailed(true) // fallback to initials
                }
                else 
                {
                    console.error(err) // log real errors
                    setFailed(true)
                }
            })

        return () =>
        {
            cancelled = true
        }
    }, [guid])

    return (
        <div
            style={{ width: size, height: size }}
            className={`relative rounded-full overflow-hidden flex items-center justify-center text-white font-light ${bgColor} ${className}`}
        >
            {/* Initials fallback */}
            <span
                className={`transition-opacity duration-300 ${loaded ? "opacity-0" : "opacity-100"}`}
            >
                {initials}
            </span>

            {/* Image */}
            {src && !failed &&
            (
                <img
                    src={src}
                    onLoad={() => setLoaded(true)}
                    onError={() => setFailed(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
                />
            )}
        </div>
    )
}

function getInitials(name: string)
{
    return name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
}

function stringToColor(str: string)
{
    let hash = 0

    for (let i = 0; i < str.length; i++)
    {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
    }

    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-yellow-500",
        "bg-indigo-500",
    ]

    return colors[Math.abs(hash) % colors.length]
}

export default Avatar
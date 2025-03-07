import { io } from "socket.io-client"

const RootAPILocal = import.meta.env.VITE_ROOT_API_LOCAL

const socket = io(`${RootAPILocal}`, {
  autoConnect: false
})

export default socket
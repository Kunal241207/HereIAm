import { useState, useRef, useEffect } from "react"
import { Terminal as TerminalIcon } from "lucide-react"

export type Line = { text: string, isCommand: boolean }

const commands: Record<string, string> = {
  help:   "Available Commands: hello, about, skills, exp, clear, whoami, coffee, sudo",
  hello:  "こんにちは!",
  about:  "a full-stack dev & AI/ML engineer heavily into competitive programming and open source.",
  skills: "Languages: Python, JavaScript, C++\nStack: React, Node.js, MongoDB\nAI/ML: Coming Soon",
  exp:    "1+ Years building apps and exploring AI/ML.",
  whoami: "A developer building intelligent systems. Welcome to my digital workspace.",
  sudo: "Permission denied.\nHint: Try bringing an offer letter."
}

const validItems = { espresso: 3.5, latte: 4.5, cappuccino: 4.8, mocha: 5 }

export function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { text: "kunal-os v1.0.0", isCommand: false },
    { text: "Type 'help' for available commands.", isCommand: false },
  ])
  const [input, setInput] = useState("")
  const [mode, setMode] = useState<"default" | "cafe">("default")
  const [cart, setCart] = useState<Record<string, number>>({})
  
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleCafeCommand = (cmd: string, originalInput: string) => {
    setHistory(prev => [...prev, { text: `cafe> ${originalInput}`, isCommand: true }])
    
    const args = cmd.split(" ")
    const action = args[0]
    
    if (action === "cancel" || action === "exit") {
      setMode("default")
      setCart({})
      setHistory(prev => [...prev, { text: "Exited Cafe_OS. Cart cleared.", isCommand: false }])
    } else if (action === "menu") {
      setHistory(prev => [...prev, { text: "--- CAFE MENU ---\nespresso       $3.50\nlatte          $4.50\ncappuccino     $4.80\nmocha          $5.00\n\nCommands: 'add <item>', 'cart', 'checkout', 'cancel'", isCommand: false }])
    } else if (action === "add") {
      let newCart = { ...cart }
      let addedMsg = ""
      let currentQty = 1
      let found = false

      args.slice(1).forEach(p => {
        if (!isNaN(Number(p))) {
          currentQty = parseInt(p)
        } else if (validItems[p as keyof typeof validItems]) {
          newCart[p] = (newCart[p] || 0) + currentQty
          addedMsg += `${currentQty}x ${p} `
          currentQty = 1
          found = true
        }
      })

      if (found) {
        setCart(newCart)
        setHistory(prev => [...prev, { text: `Added to cart: ${addedMsg.trim()}`, isCommand: false }])
      } else {
        setHistory(prev => [...prev, { text: `Item not found. Try 'add 2 latte' or 'add mocha espresso'.`, isCommand: false }])
      }
    } else if (action === "cart") {
      const items = Object.entries(cart)
      if (items.length === 0) {
        setHistory(prev => [...prev, { text: "Cart is empty.", isCommand: false }])
      } else {
        let cartText = "--- YOUR CART ---\n"
        let total = 0
        items.forEach(([k, qty]) => {
          const itemCost = validItems[k as keyof typeof validItems] as number;
          const cost = itemCost * (qty as number)
          total += cost
          cartText += `${qty}x ${k.padEnd(10)} $${cost.toFixed(2)}\n`
        })
        cartText += `-------------------\nTotal:        $${total.toFixed(2)}\nType 'checkout' to pay.`
        setHistory(prev => [...prev, { text: cartText, isCommand: false }])
      }
    } else if (action === "checkout") {
      const items = Object.entries(cart)
      if (items.length === 0) {
        setHistory(prev => [...prev, { text: "Cart is empty. Nothing to checkout.", isCommand: false }])
      } else {
        let receipt = "--- RECEIPT ---\n"
        let total = 0
        items.forEach(([k, qty]) => {
          const itemCost = validItems[k as keyof typeof validItems] as number;
          const cost = itemCost * (qty as number)
          total += cost
          receipt += `${qty}x ${k.padEnd(10)} $${cost.toFixed(2)}\n`
        })
        receipt += `-----------------\nTOTAL:       $${total.toFixed(2)}\n\nPayment successful! Enjoy your coffee ☕\nExiting Cafe_OS...`
        setHistory(prev => [...prev, { text: receipt, isCommand: false }])
        setMode("default")
        setCart({})
      }
    } else {
      setHistory(prev => [...prev, { text: "Unknown command. Try 'menu', 'add <item>', 'cart', 'checkout', or 'cancel'.", isCommand: false }])
    }
  }

  const runCommand = () => {
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    if (mode === "cafe") {
      handleCafeCommand(cmd, input)
      setInput("")
      return
    }

    if (cmd === "clear") { 
      setHistory([])
      setInput("")
      return 
    }

    if (cmd === "coffee") {
      setMode("cafe")
      setHistory(prev => [
        ...prev,
        { text: `> ${input}`, isCommand: true },
        { text: "Initializing Cafe_OS...\n\n--- CAFE MENU ---\nespresso       $3.50\nlatte          $4.50\ncappuccino     $4.80\nmocha          $5.00\n\nCommands: 'add <item>', 'cart', 'checkout', 'cancel'", isCommand: false },
      ])
      setInput("")
      return
    }

    setHistory(prev => [
      ...prev,
      { text: `> ${input}`, isCommand: true },
      { text: commands[cmd] ?? `Command not found: ${cmd}. Type 'help'`, isCommand: false },
    ])
    setInput("")
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  return (
    <div className="relative border border-[#333333] bg-[#171717]/90 backdrop-blur-xl overflow-hidden flex flex-col h-full rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="flex items-center px-4 py-3 bg-[#1e1e1e] border-b border-[#333333] relative">
        <div className="flex gap-2.5 absolute left-4">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
        </div>
        <div className="w-full text-center text-[11px] uppercase tracking-[0.2em] text-[#888] font-mono flex items-center justify-center gap-2">
          <TerminalIcon size={13} className="text-[#B7FF2A]" /> kunal_os
        </div>
      </div>
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ backgroundImage: "linear-gradient(rgba(183,255,42,0) 50%, rgba(183,255,42,0.03) 50%)", backgroundSize: "100% 4px" }}
      />
      <div
        ref={scrollRef}
        className="flex-1 p-5 md:p-6 font-mono text-[13.5px] md:text-[14.5px] overflow-y-auto flex flex-col gap-3 relative z-20 scrollbar-hide"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={line.isCommand ? "text-[#F4F1E8] font-semibold" : "text-[#A1A1AA] whitespace-pre-line leading-[1.7]"}>
            {line.text}
          </div>
        ))}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[#B7FF2A] shrink-0 tracking-wider">
            {mode === "cafe" ? "cafe>" : "guest@kunal ~$"}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && runCommand()}
            className="flex-1 bg-transparent border-none outline-none text-[#F4F1E8] font-mono p-0 m-0 w-full focus:ring-0 caret-[#B7FF2A]"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}

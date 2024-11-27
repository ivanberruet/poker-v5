import React from 'react'

export default function ClockButton({state, handleFunction, lavel1, lavel2}) {
  return (
    <button
      className="text-white text-xl border border-gray-300 rounded-md px-4 py-2 shadow-md shadow-black inset-4 lg:text-2xl"
      onClick={handleFunction}
    >
      {state ? lavel1 : lavel2}
    </button>
)
}

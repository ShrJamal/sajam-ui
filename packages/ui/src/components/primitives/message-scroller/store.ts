// A minimal external store for useSyncExternalStore. Listeners run only when
// isEqual reports a real change, so snapshots stay referentially stable.
function createStore<T>(initialSnapshot: T, isEqual: (current: T, next: T) => boolean) {
  let snapshot = initialSnapshot
  const listeners = new Set<() => void>()

  function get() {
    return snapshot
  }

  function set(nextSnapshot: T) {
    if (isEqual(snapshot, nextSnapshot)) {
      return
    }

    snapshot = nextSnapshot
    listeners.forEach((listener) => listener())
  }

  function subscribe(listener: () => void) {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }

  function hasListeners() {
    return listeners.size > 0
  }

  return { get, hasListeners, set, subscribe }
}

type Store<T> = ReturnType<typeof createStore<T>>

export { createStore }
export type { Store }

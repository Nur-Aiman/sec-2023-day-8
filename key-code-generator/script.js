function getLocationDescription(location) {
    switch (location) {
        case 1:
            return 'Left-side modifier key'
        case 2:
            return 'Right-side modifier key'
        case 3:
            return 'Numpad or other'
        default:
            return 'General key'
    }
}

function createCard(title, content) {
    return `
        <div class="card">
            <div class="card-header">${title}:</div>
            <div class="card-body">${content}</div>
        </div>
    `
}

const history = []

document.addEventListener('keydown', (event) => {
            const output = document.getElementById('output')
            const result = document.getElementById('result')
            const metaKeys = `Ctrl: ${event.ctrlKey} <br/>  Shift: ${event.shiftKey} <br/>  Alt: ${event.altKey} <br/>  Meta: ${event.metaKey}`

            const eventDump = {
                key: event.key,
                keyCode: event.keyCode,
                which: event.which,
                code: event.code,
                location: event.location,
                altKey: event.altKey,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                repeat: event.repeat,
            }

            history.unshift(event.key)
            if (history.length > 4) {
                history.pop()
            }

            result.innerHTML = `Key Pressed: ${event.key === ' ' ? 'Space' : event.key}`

            output.innerHTML = `
        ${createCard('Keycode', event.keyCode)}
        ${createCard('Event.key', event.key)}
        ${createCard('Event.location', getLocationDescription(event.location))}
        ${createCard('Event.code', event.code)}
        ${createCard('Event.which', event.which)}
        ${createCard('Description', event.key === ' ' ? 'Space' : event.key)}
        ${createCard('Meta keys', metaKeys)}
        ${createCard(
          'Event dump',
          `<pre>${JSON.stringify(eventDump, null, 2)}</pre>`
        )}
        ${createCard(
          'Unicode',
          'U+' + event.keyCode.toString(16).padStart(4, '0')
        )}
        ${createCard('History', history.join(', '))}
    `
})
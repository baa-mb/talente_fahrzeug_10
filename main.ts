input.onButtonPressed(Button.A, function () {
    lauf_flag = 1
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let wert = 0
    let info = ""
    serial.writeString(info)
    if (info == "roll") {
        // basic.showNumber(wert)
        rawSeit = Math.max(-45, Math.min(45, wert))
        mappedSeit = Math.map(rawSeit, -45, 45, -255, 255)
        // basic.showNumber(mappedSeit)
        seitLeft = mappedSeit
        seitRight = mappedSeit * -1
    }
    if (info == "pitch") {
        rawPitch = Math.max(-45, Math.min(45, wert))
        mappedPitch = Math.map(rawPitch, -45, 45, -255, 255)
        pitchLeft = mappedPitch
        pitchRight = mappedPitch
    }
    leftOutput = (pitchLeft + seitLeft) / 2
    rightOutput = (pitchRight + seitRight) / 2
    if (rawPitch == 0 && rawSeit == 0) {
        robotbit.MotorStopAll()
    } else {
        if (leftOutput < 0) {
            robotbit.MotorRun(robotbit.Motors.M1A, leftOutput)
        }
        if (rightOutput < 0) {
            robotbit.MotorRun(robotbit.Motors.M1B, rightOutput)
        }
    }
    if (info == "TB") {
        if (wert == 1) {
            control.raiseEvent(
            EventBusSource.MICROBIT_ID_BUTTON_B,
            EventBusValue.MICROBIT_BUTTON_EVT_CLICK
            )
        } else {
            control.raiseEvent(
            EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_CLICK
            )
        }
    }
})
input.onButtonPressed(Button.B, function () {
    lauf_flag = 0
})
let pitchRight = 0
let pitchLeft = 0
let mappedPitch = 0
let rawPitch = 0
let seitRight = 0
let seitLeft = 0
let mappedSeit = 0
let rawSeit = 0
let lauf_flag = 0
let leftOutput = 0
let rightOutput = 0
let Platzhalter2 = 0
let Platzhalter = 0
radio.setGroup(3)
lauf_flag = 0
basic.showIcon(IconNames.Diamond)
robotbit.MotorStopAll()

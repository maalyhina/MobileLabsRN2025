import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    PinchGestureHandler,
    FlingGestureHandler,
    Directions,
    GestureHandlerRootView,
    State,
} from 'react-native-gesture-handler';

export default function GestureGameScreen() {
    const [clicks, setClicks] = useState(0);
    const [doubleClicks, setDoubleClicks] = useState(0);
    const [holdDone, setHoldDone] = useState(false);
    const [swipeRight, setSwipeRight] = useState(false);
    const [swipeLeft, setSwipeLeft] = useState(false);
    const [score, setScore] = useState(0);
    const navigation = useNavigation();

    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;

    const onPanGestureEvent = Animated.event(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
        { useNativeDriver: false }
    );

    const onPinchGestureEvent = Animated.event(
        [{ nativeEvent: { scale: scale } }],
        { useNativeDriver: false }
    );

    const onClick = () => {
        if (clicks < 10) {
            setClicks(prev => prev + 1);
            setScore(prev => prev + 10);
        }
    };

    const onDoubleClick = () => {
        if (doubleClicks < 5) {
            setDoubleClicks(prev => prev + 1);
            setScore(prev => prev + 10);
        }
    };

    const onHold = () => {
        if (!holdDone) {
            setHoldDone(true);
            setScore(prev => prev + 10);
        }
    };

    const onFlingHandlerStateChange = ({ nativeEvent }) => {
        if (nativeEvent.state === State.END) {
            if (nativeEvent.direction === Directions.RIGHT && !swipeRight) {
                setSwipeRight(true);
                setScore(prev => prev + 10);
            } else if (nativeEvent.direction === Directions.LEFT && !swipeLeft) {
                setSwipeLeft(true);
                setScore(prev => prev + 10);
            }
        }
    };

    const doubleTapRef = React.useRef();

    return (
        <GestureHandlerRootView style={styles.container}>
            <Text style={styles.score}>Score: {score}</Text>

            <FlingGestureHandler
                direction={Directions.RIGHT | Directions.LEFT}
                onHandlerStateChange={onFlingHandlerStateChange}
            >
                <Animated.View>
                    <PanGestureHandler onGestureEvent={onPanGestureEvent}>
                        <Animated.View>
                            <PinchGestureHandler onGestureEvent={onPinchGestureEvent}>
                                <Animated.View>
                                    <LongPressGestureHandler minDurationMs={3000} onActivated={onHold}>
                                        <TapGestureHandler
                                            ref={doubleTapRef}
                                            numberOfTaps={2}
                                            onActivated={onDoubleClick}
                                        >
                                            <TapGestureHandler
                                                waitFor={doubleTapRef}
                                                numberOfTaps={1}
                                                onActivated={onClick}
                                            >
                                                <Animated.View
                                                    style={[styles.box, {
                                                        transform: [
                                                            { translateX },
                                                            { translateY },
                                                            { scale },
                                                        ]
                                                    }]}
                                                >
                                                    <Text style={styles.text}>Tap me!</Text>
                                                </Animated.View>
                                            </TapGestureHandler>
                                        </TapGestureHandler>
                                    </LongPressGestureHandler>
                                </Animated.View>
                            </PinchGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
            </FlingGestureHandler>
            <Button
                title="Перейти до завдань"
                onPress={() => navigation.navigate('Tasks', {
                    clicks,
                    doubleClicks,
                    holdDone,
                    swipeRight,
                    swipeLeft,
                    score,
                })}
            />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        width: 150,
        height: 150,
        backgroundColor: '#61dafb',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    score: {
        position: 'absolute',
        top: 40,
        fontSize: 24,
        fontWeight: 'bold',
    },
    status: {
        position: 'absolute',
        bottom: 40,
        alignItems: 'center',
    }
});

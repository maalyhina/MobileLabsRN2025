import React, { useState } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import {
	TapGestureHandler,
	LongPressGestureHandler,
	PanGestureHandler,
	FlingGestureHandler,
	PinchGestureHandler,
	Directions
} from 'react-native-gesture-handler';

export default function ClickableObject({ onScore }) {
	const [scale] = useState(new Animated.Value(1));
	const translateX = useState(new Animated.Value(0))[0];
	const translateY = useState(new Animated.Value(0))[0];

	const onSingleTap = () => onScore(1);
	const onDoubleTap = () => onScore(2);
	const onLongPress = () => onScore(5);
	const onFling = () => onScore(Math.floor(Math.random() * 10) + 1);
	const onPinch = Animated.event([{ nativeEvent: { scale } }], { useNativeDriver: true });

	return (
		<PanGestureHandler onGestureEvent={Animated.event(
			[{ nativeEvent: { translationX: translateX, translationY: translateY } }],
			{ useNativeDriver: true }
		)}>
			<Animated.View style={[styles.object, {
				transform: [
					{ translateX },
					{ translateY },
					{ scale }
				]
			}]}>
				<FlingGestureHandler direction={Directions.RIGHT} onActivated={onFling}>
					<FlingGestureHandler direction={Directions.LEFT} onActivated={onFling}>
						<PinchGestureHandler onGestureEvent={onPinch}>
							<LongPressGestureHandler minDurationMs={800} onActivated={onLongPress}>
								<TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
									<TapGestureHandler onActivated={onSingleTap}>
										<Animated.View style={styles.inner} />
									</TapGestureHandler>
								</TapGestureHandler>
							</LongPressGestureHandler>
						</PinchGestureHandler>
					</FlingGestureHandler>
				</FlingGestureHandler>
			</Animated.View>
		</PanGestureHandler>
	);
}

const styles = StyleSheet.create({
	object: { width: 150, height: 150, backgroundColor: '#aaa', justifyContent: 'center', alignItems: 'center' },
	inner: { width: 100, height: 100, backgroundColor: '#4CAF50', borderRadius: 50 }
});

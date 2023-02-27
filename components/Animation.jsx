import React from 'react';
import {StyleSheet, Button} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const Animation = () => {
  const offset = useSharedValue(0);
  // JS Thread와 UI Thread 양측 모두에서 읽고 수정할 수 있는 mutable한 값
  // sharedValue의 값은 .value 를 통해 접근할 수 있음
  // UI Thread에서 동기, JS Thread 비동기
  console.log(offset.value);

  const animatedStyles = useAnimatedStyle(() => {
    // reanimated 에서는 useAnimatedStyle 이라는 훅을 통해 애니메이션 스타일을 관리
    // 이 훅을 통해 sharedValue 와 View properties 간의 관계가 만들어짐
    // animatedStyles 은 매번 sharedValue 값이 업데이트 될 때마다 업데이트
    return {
      transform: [
        {translateX: withSpring(offset.value * 255)}, // 컴포넌트의 움직임은 translate 값에 의존
      ],
    };
  });

  return (
    <>
      <Animated.View style={[styles.box, animatedStyles]} />
      {/* 위 훅을 통해 만들어진 값은 반드시 Reanimated 에서 import 한 Animated 컴포넌트의 style 프로퍼티에 할당 */}
      <Button
        onPress={() => (offset.value = Math.random())}
        // withSpring =>  we make an animation object which is then used to run updates
        // on the Shared Value until it reaches the target.
        title="Move"
      />
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: '#001a72',
  },
});

export default Animation;

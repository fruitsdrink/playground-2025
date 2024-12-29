import { View, Text, type TextProps, Button } from "react-native";
import type React from "react";
import { useState } from "react";
import { Stack } from "expo-router";
import { MotiView } from "moti";

const numbersToNice = [...Array(10).keys()];
const _stagger = 50;

export default function ReanimatedCounter() {
  const [value, setValue] = useState(12345);
  return (
    <>
      <Stack.Screen
        options={{
          title: "计数器动画",
          headerBackTitle: "返回"
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff"
        }}
      >
        <Ticker value={value} fontSize={120} />

        <View style={{ marginTop: 50 }}>
          <Button
            title="Random Value"
            onPress={() => {
              setValue(Math.floor(Math.random() * 89900) / 100);
            }}
          />
        </View>
      </View>
    </>
  );
}

type TickerProps = {
  value: number;
  fontSize?: number;
};

const Ticker: React.FC<TickerProps> = ({ value, fontSize = 50 }) => {
  const intNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
  const splitValue = intNumber.toString().split("");
  const [newFontSize, setNewFontSize] = useState(fontSize);

  return (
    <View>
      {/* <Text>Prop fontSize: {fontSize}</Text> */}
      {/* <Text>Calc fontSize: {newFontSize}</Text> */}
      <Tick
        fontSize={fontSize}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{
          position: "absolute",
          left: 1000000,
          top: 1000000
        }}
        onTextLayout={(e) => {
          console.log(e.nativeEvent.lines);
          setNewFontSize(e.nativeEvent.lines[0].ascender * 0.5);
        }}
      >
        {intNumber}
      </Tick>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap"
        }}
      >
        {splitValue.map((num, index) => {
          if (!Number.isNaN(Number.parseInt(num))) {
            return (
              <TickerList
                key={index.toString()}
                index={index}
                number={Number.parseInt(num)}
                fontSize={newFontSize}
              />
            );
          }

          return (
            <Tick
              key={index.toString()}
              fontSize={newFontSize}
              style={{ opacity: 0.32 }}
            >
              {num}
            </Tick>
          );
        })}
      </View>
    </View>
  );
};

type TickerListProps = {
  index: number;
  number: number;
  fontSize: number;
};
const TickerList: React.FC<TickerListProps> = ({ index, number, fontSize }) => {
  return (
    <View
      style={{
        height: fontSize,
        overflow: "hidden"
      }}
    >
      <MotiView
        animate={{
          translateY: -fontSize * 1.1 * number
        }}
        transition={{
          delay: index * _stagger,
          damping: 80,
          stiffness: 200
        }}
      >
        {numbersToNice.map((num) => {
          return (
            <Tick key={`tick-${num}`} fontSize={fontSize}>
              {num}
            </Tick>
          );
        })}
      </MotiView>
    </View>
  );
};

const Tick: React.FC<TextProps & { fontSize: number }> = ({
  children,
  fontSize,
  style,
  ...rest
}) => {
  return (
    <Text
      {...rest}
      style={[
        style,
        {
          fontSize,
          lineHeight: fontSize * 1.1,
          fontWeight: "bold",
          fontVariant: ["tabular-nums"]
        }
      ]}
    >
      {children}
    </Text>
  );
};
